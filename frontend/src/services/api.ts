import type { WeatherData } from "../types/weather";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const weatherApi = {
    getAllWeather: async (): Promise<WeatherData[]> => {
        const response = await axios.get(`${API_BASE_URL}/weather`);
        return response.data;
    },

    getWeatherByCity: async (cityId: number):
    Promise<WeatherData> => {
        const response = await axios.get(`${API_BASE_URL}/weather/${cityId}`);
        return response.data;
    }
}