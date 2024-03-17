import type { WeatherAPIForecast } from "~/types/api";

import type { Forecast } from "~/types/model";

export const useWeatherApi = (locationSlug: MaybeRefOrGetter) => {
  const config = useRuntimeConfig();
  const API_KEY = config.public.API_KEY;
  const BASE_URL = config.public.API_BASE_URL as string;

  return useFetch(`${BASE_URL}/forecast.json`, {
    query: {
      key: API_KEY,
      q: locationSlug,
      days: 5,
    },
    transform: (data: WeatherAPIForecast): Forecast => {
      return formatWeatherData(data as WeatherAPIForecast);
    },
  });
};
