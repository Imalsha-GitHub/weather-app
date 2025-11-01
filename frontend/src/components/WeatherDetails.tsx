import type { WeatherData } from "../types/weather";
import { useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";
import { formatDate, formatTime, getWeatherColor, getWeatherIcon, metersToKm } from "../utils/weatherUtils";

interface WeatherDetailProps {
    weather: WeatherData;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ weather }) => {
  const navigate = useNavigate();
  const temp = Math.round(weather.main.temp);
  const tempMin = Math.round(weather.main.temp_min);
  const tempMax = Math.round(weather.main.temp_max);
  const description = weather.weather.description;
  const colorClass = getWeatherColor(description);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🌤️</span>
            <h1 className="text-3xl font-bold text-white">Weather App</h1>
          </div>
          <div className="flex justify-start md:justify-end">
            <AuthButton />
          </div>
        </div>

        {/* Detail Card */}
        <div className="bg-dark-card rounded-2xl overflow-hidden">
          {/* Top colored section */}
          <div
            className={`bg-gradient-to-br ${colorClass} p-8 md:p-12 relative`}
          >
            <button
              onClick={() => navigate("/")}
              className="absolute top-6 left-6 text-white hover:bg-white/20 rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
            >
              <span>Back</span>
            </button>

            <div className="text-center text-white mt-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-2">
                {weather.name}, {weather.country}
              </h2>
              <p className="text-lg opacity-90 mb-8">
                {formatDate(weather.dt)}
              </p>

              <div className="flex flex-col items-center gap-4">
                <span className="text-8xl md:text-9xl">
                  {getWeatherIcon(description)}
                </span>
                <div className="text-7xl md:text-8xl font-bold">{temp}°c</div>
                <p className="text-2xl capitalize">{description}</p>
                <div className="flex gap-8 text-lg mt-4">
                  <p>Temp Min: {tempMin}°c</p>
                  <p>Temp Max: {tempMax}°c</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom details section */}
          <div className="bg-dark-card p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
              <div className="space-y-2">
                <p className="text-lg">
                  <span className="font-semibold">Pressure:</span>{" "}
                  {weather.main.pressure}hPa
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Humidity:</span>{" "}
                  {weather.main.humidity}%
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Visibility:</span>{" "}
                  {metersToKm(weather.visibility)}km
                </p>
              </div>

              <div className="space-y-2 text-center">
                <div className="text-lg">
                  <span>
                    {weather.wind.speed}m/s {weather.wind.deg} Degree
                  </span>
                </div>
              </div>

              <div className="space-y-2 md:text-right">
                <p className="text-lg">
                  <span className="font-semibold">Sunrise:</span>{" "}
                  {formatTime(weather.sys.sunrise, weather.timezone)}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Sunset:</span>{" "}
                  {formatTime(weather.sys.sunset, weather.timezone)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/60">
          <p>2025 Fidenz Technologies</p>
        </div>
      </div>
    </div>
  );
};


export default WeatherDetail;