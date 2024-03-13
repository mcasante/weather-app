import type { WeatherAPIForecast } from "~/types/WeatherAPI";

interface Temperature {
  tempC: number;
  tempF: number;
}

interface Condition {
  code: number;
  name: string;
  icon: string;
}

interface Weather extends Temperature {
  condition: Condition;
}

interface ForecastDay {
  date: number;
  hour: {
    time: number;
    tempC: number;
    tempF: number;
    condition: Condition;
  }[];
}

interface Forecast {
  location: {
    name: string;
    localDate: number;
    timezone: string;
  };
  current: { date: number } & Weather;
  day: ForecastDay[];
}

const getCondition = (conditionCode: number): Condition => {
  return {
    code: conditionCode,
    name: "Clear",
    icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
  };
};

export default (rawWeatherData: WeatherAPIForecast): Forecast => {
  const {
    current,
    forecast: { forecastday },
    location,
  } = rawWeatherData;
  return {
    location: {
      name: location.name,
      localDate: location.localtime_epoch,
      timezone: location.tz_id,
    },
    current: {
      date: current.last_updated_epoch,
      tempC: current.temp_c,
      tempF: current.temp_f,
      condition: getCondition(current.condition.code),
    },
    day: forecastday.map((day: any) => {
      return {
        date: day.date_epoch,
        hour: day.hour.map((hour: any) => {
          return {
            time: hour.time_epoch,
            tempC: hour.temp_c,
            tempF: hour.temp_f,
            condition: getCondition(hour.condition.code),
          };
        }),
      };
    }),
  };
};
