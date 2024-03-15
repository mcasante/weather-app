import { defineStore } from "pinia";

export const useStyleStore = defineStore(
  "style",
  () => {
    const primaryColor = ref<ReturnType<typeof getColor>>("bg-w-blue-200");

    const setPrimaryColor = (temperature: number) => {
      primaryColor.value = getColor(temperature);
    };

    const trackerStyle = reactive({
      width: "0",
      transform: "translateX(-100%) translateY(-6px)",
    });

    const setTrackerStyle = (width: number, transform: number) => {
      trackerStyle.width = `${width}px`;
      trackerStyle.transform = `translateX(${transform}px) translateY(-6px)`;
    };

    const resetTrackerStyle = () => {
      trackerStyle.width = "0";
      trackerStyle.transform = "translateX(-100%) translateY(-6px)";
    };

    return {
      primaryColor,
      trackerStyle,
      setPrimaryColor,
      setTrackerStyle,
      resetTrackerStyle,
    };
  },
  { persist: true }
);
