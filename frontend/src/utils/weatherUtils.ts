export const kelvinToCelcius = (kelvin: number): number => {
    return Math.round(kelvin - 273.15);
};

export const formatTime = (timestamp: number, timezone: number): string => {
    const date = new Date((timestamp + timezone) * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes}${ampm}`;
};

export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();

    return `${formattedHours}.${minutes}${ampm}, ${month} ${day}`;
};

export const metersToKm = (meters: number): string => {
    return (meters / 1000).toFixed(1);
};

export const getWeatherColor = (description: string): string => {
    const desc = description.toLowerCase();

    if (desc.includes('clear')) return 'from-green-500 to-green-600';
    if (desc.includes('cloud') && desc.includes('few')) return 'from-blue-400 to-blue-500';
    if (desc.includes('cloud')) return 'from-purple-500 to-purple-600';
    if (desc.includes('rain')) return 'from-orange-500 to-orange-600';
    if (desc.includes('mist') || desc.includes('fog')) return 'from-red-400 to-red-500';
    if (desc.includes('snow')) return 'from-cyan-400 to-cyan-500';
    if (desc.includes('thunder')) return 'from-indigo-600 to-indigo-700';

    return 'from-blue-500 to-blue-600'; // default
};

export const getWeatherIcon = (description: string): string => {
  const desc = description.toLowerCase();
  
  if (desc.includes('clear')) return '☀️';
  if (desc.includes('cloud') && desc.includes('few')) return '🌤️';
  if (desc.includes('cloud') && desc.includes('broken')) return '☁️';
  if (desc.includes('cloud')) return '☁️';
  if (desc.includes('rain') && desc.includes('light')) return '🌧️';
  if (desc.includes('rain')) return '🌧️';
  if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
  if (desc.includes('snow')) return '❄️';
  if (desc.includes('thunder')) return '⛈️';
  
  return '🌤️'; // default
};

