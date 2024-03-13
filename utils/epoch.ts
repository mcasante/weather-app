export function Epoch(epoch: number) {
  const date = new Date(epoch * 1000);
  return {
    getWeekDay: (timezone: string) =>
      date.toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: timezone,
      }),
    getRelativeWeekDay: (referenceEpoch: number, timezone: string) => {
      const referenceDateWeekDay = Epoch(referenceEpoch).getWeekDay(timezone);
      const dateWeekDay = Epoch(epoch).getWeekDay("UTC");

      switch (dateWeekDay) {
        case referenceDateWeekDay:
          return "Today";
        case Epoch(referenceEpoch).getTomorrow(timezone):
          return "Tomorrow";
        default:
          return dateWeekDay;
      }
    },
    getTomorrow: (timezone: string) => {
      const tomorrow = new Date(date);
      tomorrow.setDate(tomorrow.getDate() + 1);

      return tomorrow.toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: timezone,
      });
    },
    getTime: (timezone: string) => {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        // minute: false,
        timeZone: timezone,
      });
    },
  };
}
