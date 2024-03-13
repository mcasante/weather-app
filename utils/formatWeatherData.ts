import type { WeatherAPIForecast } from "~/types/api";
import type { Forecast, WeatherGroups } from "~/types/model";

const weatherGroups: WeatherGroups = [
  {
    id: "sunny",
    name: "Sunny",
    codes: [1000],
  },
  {
    id: "clear-cloudy",
    name: "Clear to Cloudy",
    codes: [], // No codes fit this category exactly in your data
  },
  {
    id: "partly-cloudy",
    name: "Partly Cloudy",
    codes: [1003],
  },
  {
    id: "cloudy",
    name: "Cloudy",
    codes: [1006, 1009],
  },
  {
    id: "drizzle",
    name: "Drizzle",
    codes: [
      1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201,
      1063, 1072,
    ],
  },
  {
    id: "showers",
    name: "Showers",
    codes: [1240, 1243, 1246, 1249, 1252, 1255, 1258, 1261, 1264],
  },
  {
    id: "thunderstorm",
    name: "Thunderstorm",
    codes: [1087, 1273, 1276, 1279, 1282],
  },
  {
    id: "snow",
    name: "Snow",
    codes: [1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1117],
  },
  {
    id: "sleet",
    name: "Sleet",
    codes: [1066, 1204, 1207, 1249, 1252, 1069],
  },
  {
    id: "windy",
    name: "Windy",
    codes: [], // No codes directly indicate wind speed in your data
  },
  {
    id: "hail",
    name: "Hail",
    codes: [1237],
  },
  {
    id: "tornado",
    name: "Tornado",
    codes: [], // No codes for Tornadoes in your data (Tornadoes require a warning, not a forecast code)
  },
  {
    id: "isolated-thunderstorm",
    name: "Isolated Thunderstorm",
    codes: [], // Can't be determined from provided codes. Isolated thunderstorms are a subset of regular thunderstorms
  },
  {
    id: "snow-flurries",
    name: "Snow Flurries",
    codes: [
      1210,
      1213,
      1255, // Can be imprecise, but these codes are for light snow which might be flurries
    ],
  },
  {
    id: "mostly-cloudy",
    name: "Mostly Cloudy",
    codes: [1030, 1135, 1147], // No exact code provided, but could be inferred from combining cloudy and partly cloudy
  },
];

const getCondition = (conditionCode: MaybeRef<number>) => {
  const condition = weatherGroups.find((group) =>
    group.codes.includes(toValue(conditionCode))
  );

  return {
    name: condition?.name ?? "unknown",
    icon: condition?.id ? `/icons/${condition.id}.svg` : "unknown",
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
      tempC: Math.round(current.temp_c),
      tempF: Math.round(current.temp_f),
      condition: getCondition(current.condition.code),
    },
    day: forecastday.map((day: any) => {
      return {
        date: day.date_epoch,
        weekday: Epoch(day.date_epoch).getRelativeWeekDay(
          location.localtime_epoch,
          location.tz_id
        ),
        tempC: Math.round(day.day.avgtemp_c),
        tempF: Math.round(day.day.avgtemp_f),
        condition: getCondition(day.day.condition.code),
        hour: day.hour.map((hour: any) => {
          return {
            time: hour.time_epoch,
            tempC: Math.round(hour.temp_c),
            tempF: Math.round(hour.temp_f),
            condition: getCondition(hour.condition.code),
          };
        }),
      };
    }),
  };
};
