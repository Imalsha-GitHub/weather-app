import type { WeatherData } from "../types/weather";
import {
  formatDate,
  formatTime,
  getWeatherColor,
  getWeatherIcon,
  metersToKm,
} from "../utils/weatherUtils";

interface WeatherCardProps {
  weather: WeatherData;
  onClick: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onClick }) => {
  const temp = Math.round(weather.main.temp);
  const tempMin = Math.round(weather.main.temp_min);
  const tempMax = Math.round(weather.main.temp_max);
  const description = weather.weather.description;
  const colorClass = getWeatherColor(description);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer transition-transform hover:scale-105 duration-300"
    >
      {/* top colored section */}
      <div
        className={`bg-gradient-to-br ${colorClass} rounded-t-2xl p-6 relative overflow-hidden`}
      >
        <div className="text-white">
          <h3 className="text-2xl fonnt-semibold mb-1">
            {weather.name}, {weather.country}
          </h3>
          <p className="text-sm opacity-90 mb-4">{formatDate(weather.dt)}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-5xl">{getWeatherIcon(description)}</span>
              <div>
                <p className="text-lg capitalize">{description}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-5xl font-bold">{temp}°c</div>
              <p className="text-sm mt-1">Temp min: {tempMin}°c</p>
              <p className="text-sm">Temp Max: {tempMax}°c</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom dark section */}
      <div className="bg-dark-card rounded-b-2xl p-6">
        <div className="grid grid-cols-2 gap-6 text-white/80 text-sm">
          <div>
            <p>
              <span className="font-semibold">Pressure:</span>{" "}
              {weather.main.pressure}hPa
            </p>
            <p>
              <span className="font-semibold">Humidity:</span>{" "}
              {weather.main.humidity}%
            </p>
            <p>
              <span className="font-semibold">Visibility:</span>{" "}
              {metersToKm(weather.visibility)}km
            </p>
          </div>

          <div className="text-right">
            <div className="mb-2">
              <span>
                {weather.wind.speed}m/s {weather.wind.deg} Degree
              </span>
            </div>
            <p>
              <span className="font-semibold">Sunrise:</span>{" "}
              {formatTime(weather.sys.sunrise, weather.timezone)}
            </p>
            <p>
              <span className="font-semibold">Sunset:</span>{" "}
              {formatTime(weather.sys.sunset, weather.timezone)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
