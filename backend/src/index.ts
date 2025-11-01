import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import cors from 'cors';
import path from 'path';
import { CitiesData, City, WeatherData } from './types';
import fs from 'fs';
import { fetchWeatherData } from './weatherService';

dotenv.config();

const app =  express();
const PORT = process.env.PORT || 5000;

// ensure API key exists before starting service
if(!process.env.OPENWEATHER_API_KEY) {
    console.error("OPENWEATHER_API_KEY is not configured.");
    process.exit(1);
}

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
    console.error(
        "Auth0 env missing."
    );
    process.exit(1);
}

const checkJwt = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`
});

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

// load cities from JSON file
const citiesPath = path.join(__dirname, "../../cities.json");
let cities: City[] = [];

try {
    const citiesData = fs.readFileSync(citiesPath, 'utf-8');
    const parsedData: CitiesData = JSON.parse(citiesData);
    cities = parsedData.List;
    console.log(`Loaded ${cities.length} cities from cities.json`);
} catch (error) {
    console.error("Error loading cities.json:", error);
    console.error("Attempted path:", citiesPath);
    process.exit(1);
}

console.log("openweathermap API connected");
console.log("oauth0 enabled");

// Routes
app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "OK", message: "Weather API is running."})
});

// get all cities
app.get("/api/cities", checkJwt, (req: Request, res: Response) => {
    res.json(cities);
});

// get weather for all cities
app.get("/api/weather", checkJwt, async (req: Request, res: Response) => {
    try {
        const weatherPromises = cities.map(async (city) => {
            try {
                return await fetchWeatherData(parseInt(city.CityCode, 10));
            } catch (error) {
                console.error(
                    `Error fetching weather for ${city.CityName}:`,
                    error instanceof Error ? error.message : error
                );
                return null;
            }
        });

        const weatherData = (await Promise.all(weatherPromises)).filter(
            (data): data is WeatherData => data !== null
        );

        if (weatherData.length === 0) {
            return res.status(500).json({
                error: "Unable to fetch weather data from OperWeatherMap"
            });
        }
        res.json(weatherData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(502).json({
            error: "Unable to fetch weather data from OpenWeatherMap",
        });
    }

});

// get weather for a specific city
app.get("/api/weather/:cityId", checkJwt, async (req: Request, res: Response) => {
    const cityId = parseInt(req.params.cityId, 10);

    if (isNaN(cityId)) {
        return res.status(400).json({ error: "Invalid city ID"});
    }

    try {
        const weatherData = await fetchWeatherData(cityId);
        res.json(weatherData);
    } catch (error) {
        console.error("Error fetching weather data: ", error);
        res.status(502).json({
            error: "Failed to fetch weather data",
            message: error instanceof Error ? error.message : "Unknown error"
        });
    }
})

// server
app.listen(PORT, () => {
    console.log(`Server is runinng on port ${PORT}`);
    console.log(
        `CORS enabled for: ${process.env.FRONTEND_URL || "http://localhost:5173"}`
    );
});