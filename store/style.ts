import { defineStore } from "pinia";

export const useStyleStore = defineStore(
  "style",
  () => {
    const primaryColor = ref<ReturnType<typeof getColor>>("bg-w-blue-200");

    const setPrimaryColor = (temperature: number) => {
      primaryColor.value = getColor(temperature);
    };

    return {
      primaryColor,
      setPrimaryColor,
    };
  },
  { persist: true }
);
