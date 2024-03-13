<script lang="ts" setup>
import type { WeatherAPIForecast } from "~/types/WeatherAPI";

const props = defineProps<{
  location: string;
}>();

const API_KEY = "17a0ea6d3af24151a23170312240403";

const {
  data: apiData,
  pending,
  error,
  refresh,
} = await useFetch<WeatherAPIForecast>(
  "http://api.weatherapi.com/v1/forecast.json",
  {
    query: {
      key: API_KEY,
      q: props.location,
      days: 5,
    },
    watch: [props],
    onResponse({ response }) {
      console.log(response);
    },
  }
);

console.log(apiData.value);

// const data = computed(() => formatWeatherData(apiData.value!));

const color = (temperature: number) => {
  if (temperature < 8) return "bg-w-blue-200";
  if (temperature < 15) return "bg-w-green";
  if (temperature < 24) return "bg-w-yellow";
  return "bg-w-red-100";
};
</script>

<template>
  <div class="flex gap-6">
    <!-- <div
      class="flex flex-col px-4 items-center py-12 px-10 rounded-3xl"
      :class="color(3)"
    >
      <div
        class="w-[100px] h-[100px] flex justify-center items-center rounded-full icon-wrapper relative"
      >
        {{ data.location.name }}
        <img />
      </div>
      <h2 class="text-3xl font-semibold mt-4">{{ data.location.name }}</h2>
      <p class="text-xs mt-2 text-w-gray font-semibold">
        {{ data.current.condition.name }}
      </p>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.icon-wrapper::before {
  @apply absolute inset-0 rounded-full;
  content: "";
  background-color: rgba(0, 0, 0, 0.3);
  mix-blend-mode: overlay;
}
</style>
