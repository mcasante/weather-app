// export const useWeather = async (
//   location: MaybeRefOrGetter<WeatherAPIForecast>
// ) => {
//   const weatherData = ref<Forecast | null>(null);

//   watchEffect(async () => {
//     const query = {
//       key: API_KEY,
//       q: toValue(location),
//       days: 5,
//     };

//     const { data, pending, error, refresh } =
//       await useFetch<WeatherAPIForecast>(
//         "https://api.weatherapi.com/v1/forecast.json",
//         { query }
//       );

//     weatherData.value = mapWeatherData(data.value!);
//   });

//   return weatherData;
// };
