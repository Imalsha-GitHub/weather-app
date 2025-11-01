import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useCallback } from "react";
import type { WeatherData } from "../types/weather";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const useWeatherApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const authorizedGet = useCallback(
    async <T>(endpoint: string) => {
      const token = await getAccessTokenSilently();
      const response = await axios.get<T>(`${API_BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    [getAccessTokenSilently]
  );

  const getAllWeather = useCallback(async (): Promise<WeatherData[]> => {
    return authorizedGet<WeatherData[]>("/weather");
  }, [authorizedGet]);

  const getWeatherByCity = useCallback(
    async (cityId: number): Promise<WeatherData> => {
      return authorizedGet<WeatherData>(`/weather/${cityId}`);
    },
    [authorizedGet]
  );

  return { getAllWeather, getWeatherByCity };
};
