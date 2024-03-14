<script lang="ts" setup>
import type { WeatherAPIForecast } from "~/types/api";
import { useAppStore } from "~/store";

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

const appStore = useAppStore();

watchEffect(() => {
  if (!data.value) return;
  appStore.setPrimaryColor(data.value.current.tempC);
});

const now = computed(() =>
  Epoch(Date.now() / 1000).getTime(data.value?.location.timezone || "UTC")
);

const hourItems = computed(() => {
  if (!data.value) return [];
  return [...data.value.day[0].hour, ...data.value.day[1].hour];
});

const currentIndex = useClamp(0, 0, hourItems.value.length / 2);

watch(hourItems, () => {
  currentIndex.value = hourItems.value.findIndex(
    (hour) =>
      Epoch(hour.time).getTime(data.value?.location.timezone || "UTC") ===
      now.value
  );
});

const wrapper = ref();
const { width } = useElementBounding(wrapper);
const itemWidth = computed(() => Math.round(width.value / 5));
</script>

<template>
  <div class="grid grid-cols-7 gap-3">
    <template v-if="data">
      <WeatherCard
        class="col-span-2"
        :weather="data.current"
        :label="data.location.name"
      />
      <div ref="wrapper" class="col-span-5 flex flex-col justify-between">
        <WCarousel
          v-model:active.sync="currentIndex"
          class="bg-repeat bg-mango-amber-100"
          :width="itemWidth"
          :items="hourItems"
          :key="itemWidth"
          :max="24"
        >
          <template #default="{ item }">
            <WeatherTime :time="item" :timezone="data.location.timezone" />
          </template>
        </WCarousel>

        <div class="grid grid-cols-5 gap-6 mx-3">
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
