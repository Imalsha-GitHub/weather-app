import cache from "./cache";
import { WeatherData } from "./types";
import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeatherData = async (cityId: number): Promise<WeatherData> => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
        throw new Error("OPENWEATHER_API_KEY is not configured");
    }

    // check cache first
    const cacheKey = `weather_${cityId}`;
    const cachedData = cache.get<WeatherData>(cacheKey);

    if (cachedData) {
        console.log(`Cache hit for city Id: ${cityId}`);
        return cachedData;
    }

    // fetch from api if not in cache
    console.log(`Fetcing from API for city ID: ${cityId}`);

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                id: cityId,
                appid: apiKey,
                units: "metric", // get temperature in celsius
            }
        });

        const weatherData: WeatherData = {
            id: response.data.id,
            name: response.data.name,
            country: response.data.sys.country,
            weather: {
                main: response.data.weather[0].main,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
            },
            main: {
                temp: response.data.main.temp,
                feels_like: response.data.main.feels_like,
                temp_min: response.data.main.temp_min,
                temp_max: response.data.main.temp_max,
                pressure: response.data.main.pressure,
                humidity: response.data.main.humidity,
            },
            visibility: response.data.visibility,
            wind: {
                speed: response.data.wind.speed,
                deg: response.data.wind.deg,
            },
            sys: {
                sunrise: response.data.sys.sunrise,
                sunset: response.data.sys.sunset,
            },
            dt: response.data.dt,
            timezone: response.data.timezone,
        };

        // store in cache
        cache.set(cacheKey, weatherData);

        return weatherData;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                `Failed to fetch weather data: ${
                error.response?.data?.message || error.message}`
            );
        }
        throw error;
    }
}