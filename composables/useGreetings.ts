const periodsMap = Object.entries({
  morning: [5, 12],
  afternoon: [12, 17],
  evening: [17, 20],
  night: [20, 5],
});

const findPeriodFactory =
  (hour: number) =>
  ([_, [start, end]]: (typeof periodsMap)[0]) => {
    if (start <= end) {
      return hour >= start && hour < end;
    } else {
      return hour >= start || hour < end;
    }
  };

export const useGreetings = () => {
  const currentTime = ref(new Date());

  const greetings = computed(() => {
    const hour = currentTime.value.getHours();
    const period = periodsMap.find(findPeriodFactory(hour))?.[0];
    const periodGreet = period ? `Good ${period}` : "Hello";

    return periodGreet;
  });

  let interval: ReturnType<typeof setInterval>;
  onMounted(() => {
    interval = setInterval(() => {
      currentTime.value = new Date();
    }, 1000);
  });

  onUnmounted(() => clearInterval(interval));

  return greetings;
};
