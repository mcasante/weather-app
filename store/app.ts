import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const userName = ref("user 🌞");
  const primaryColor = ref<ReturnType<typeof getColor>>("bg-w-blue-200");

  const setPrimaryColor = (temperature: number) => {
    primaryColor.value = getColor(temperature);
  };

  return {
    userName,
    primaryColor,
    setPrimaryColor,
  };
});
