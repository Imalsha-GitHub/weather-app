import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { weatherApi } from "../services/api";
import WeatherCard from "../components/WeatherCard";
import type { WeatherData } from "../types/weather";


export default function HomePage() {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async () => {
        try {
            setLoading(true);
            const data = await weatherApi.getAllWeather();
            setWeatherData(data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch weather data. Please try again later.");
            console.error("Error fetching weather data:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (cityId: number) => {
        navigate(`/weather/${cityId}`);
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="text-5xl">🌤️</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Weather App
                        </h1>
                    </div>
                </div>

                {loading && (
                    <div className="text-center text-white text-xl">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                        <p>Loading weather data...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-lg text-center">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {weatherData.map((weather) => (
                            <WeatherCard 
                            key={weather.id}
                            weather={weather}
                            onClick={() => handleCardClick(weather.id)}
                            />
                        ))}
                    </div>
                )}

                <div className="text-center mt-12 text-white/60">
                    <p>2025 Fidenz Technologies</p>
                </div>
            </div>
        </div>
    )
}