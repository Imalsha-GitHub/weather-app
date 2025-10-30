/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-blue": "#4A90E2",
        "weather-purple": "#8E44AD",
        "weather-green": "#27AE60",
        "weather-orange": "#E67E22",
        "weather-red": "#C0392B",
        "dark-bg": "#1E1E2E",
        "dark-card": "#2D2D44",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
