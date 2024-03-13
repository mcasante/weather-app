const weatherGroups = [
  { name: "sunny", codes: [1000] }, // Sunny
  { name: "clear-cloudy", codes: [] }, // Clear Cloudy
  { name: "partly-cloudy", codes: [1003] }, // Partly Cloudy
  { name: "cloudy", codes: [1006, 1009] }, // Cloudy
  { name: "drizzle", codes: [1150, 1153, 1168, 1171] }, // Drizzle
  {
    name: "showers",
    codes: [1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246],
  }, // Showers
  { name: "thunderstorm", codes: [1087, 1273, 1276] }, // Thunderstorm
  { name: "snow", codes: [1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225] }, // Snow
  { name: "sleet", codes: [1204, 1207, 1198, 1201] }, // Sleet
  { name: "windy", codes: [] }, // Windy
  { name: "hail", codes: [1237] }, // Hail
  { name: "tornado", codes: [] }, // Tornado
  { name: "isolated-thunderstorm", codes: [1279, 1282] }, // Isolated Thunderstorm
  { name: "snow-flurries", codes: [1066, 1255, 1258] }, // Snow Flurries
  { name: "mostly-cloudy", codes: [] }, // Mostly Cloudy (Same as Cloudy)
];

export const useConditions = (conditionCode: MaybeRef<number>) => {
  const ref = computed(() => {
    const condition = weatherGroups.find((group) =>
      group.codes.includes(toValue(conditionCode))
    );

    return condition?.name ?? "unknown";
  });

  return ref;
};
