export interface Temperature {
  tempC: number;
  tempF: number;
}

export interface Condition {
  name: string;
  icon: string;
}

export interface Weather extends Temperature {
  condition: Condition;
}

export interface ForecastDay extends Weather {
  date: number;
  weekday: string;
  hour: {
    time: number;
    tempC: number;
    tempF: number;
    condition: Condition;
  }[];
}

export interface Forecast {
  location: {
    name: string;
    localDate: number;
    timezone: string;
  };
  current: { date: number } & Weather;
  day: ForecastDay[];
}

export type WeatherGroups = {
  id:
    | "sunny"
    | "clear-cloudy"
    | "partly-cloudy"
    | "cloudy"
    | "drizzle"
    | "showers"
    | "thunderstorm"
    | "snow"
    | "sleet"
    | "windy"
    | "hail"
    | "tornado"
    | "isolated-thunderstorm"
    | "snow-flurries"
    | "mostly-cloudy";
  name: string;
  codes: number[];
}[];
