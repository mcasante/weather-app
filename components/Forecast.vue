<script lang="ts" setup>
import type { WeatherAPIForecast } from "~/types/api";

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
  "https://api.weatherapi.com/v1/forecast.json",
  {
    query: {
      key: API_KEY,
      q: computed(() => props.location),
      days: 5,
    },
  }
);

const data = computed(() =>
  apiData.value ? formatWeatherData(apiData.value) : null
);

const now = computed(() =>
  Epoch(Date.now() / 1000).getTime(data.value?.location.timezone || "UTC")
);

const hourItems = computed(() => data.value?.day[0].hour || []);

const currentIndex = useClamp(
  hourItems.value.findIndex(
    (hour) =>
      Epoch(hour.time).getTime(data.value?.location.timezone || "UTC") ===
      now.value
  ),
  0,
  (data.value?.day[0].hour.length || 1) - 1
);
</script>

<template>
  <div class="grid grid-cols-7 gap-6">
    <template v-if="data">
      <WeatherCard
        class="col-span-2"
        :weather="data.current"
        :label="data.location.name"
      />
      <div class="col-span-5 flex flex-col justify-between">
        <WCarousel
          v-model:active.sync="currentIndex"
          class="bg-repeat bg-mango-amber-100"
          :max-width="250"
          :items="hourItems"
        >
          <template #default="{ item, isSwiping, index }">
            <WeatherTime :time="item" :timezone="data.location.timezone" />
          </template>
        </WCarousel>

        <div class="grid grid-cols-5 gap-6">
          <WeatherCard
            v-for="day in data.day"
            :key="day.date"
            :weather="day"
            :label="day.weekday"
            :small="true"
          />
        </div>
      </div>
    </template>
  </div>
</template>
