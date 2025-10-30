import { useEffect, useState } from "react";
import type { WeatherData } from "../types/weather";
import { useNavigate, useParams } from "react-router-dom";
import { weatherApi } from "../services/api";
import WeatherDetail from "../components/WeatherDetails";


export default function DetailPage() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { cityId } = useParams< {cityId: string}>();

    useEffect(() => {
        if (cityId) {
            fetchWeatherData(parseInt(cityId, 10));
        }
    }, [cityId]);

    const fetchWeatherData = async (id: number) => {
        try {
            setLoading(true);
            const data = await weatherApi.getWeatherByCity(id);
            setWeather(data);
        } catch (err) {
            console.error("Error fetching weather data:", err);
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-white text-xl">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p>Loading weather data...</p>
                </div>
            </div>
        );
    }

    if (!weather) {
        return null;
    }

    return <WeatherDetail weather={weather}/>
}