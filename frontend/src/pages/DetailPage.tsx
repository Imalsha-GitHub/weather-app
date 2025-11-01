import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WeatherDetail from "../components/WeatherDetails";
import { useWeatherApi } from "../services/api";
import type { WeatherData } from "../types/weather";

export default function DetailPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cityId } = useParams<{ cityId: string }>();

  const { getWeatherByCity } = useWeatherApi();

  const fetchWeatherData = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        const data = await getWeatherByCity(id);
        setWeather(data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    },
    [getWeatherByCity, navigate]
  );

  useEffect(() => {
    if (cityId) {
      fetchWeatherData(parseInt(cityId, 10));
    }
  }, [cityId, fetchWeatherData]);

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

  return <WeatherDetail weather={weather} />;
}
