import { defineStore } from "pinia";

export const useStyleStore = defineStore(
  "style",
  () => {
    const primaryColor = ref<ReturnType<typeof getColor>>({
      bg: "bg-w-blue-200",
      text: "text-w-blue-800",
      border: "border-w-blue-200",
      hex: "#C3E0FB",
    });

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
