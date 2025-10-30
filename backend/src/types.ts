
export interface City {
    CityCode: string;
    CityName: string;
    Temp: string;
    Status: string;
}

export interface CitiesData {
    List: City[];
}

export interface WeatherData {
    id: number;
    name: string;
    country: string;
    weather: {
        main: string;
        description: string;
        icon: string;
    };
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    sys: {
        sunrise: number;
        sunset: number;
    };
    dt: number;
    timezone: number;
}