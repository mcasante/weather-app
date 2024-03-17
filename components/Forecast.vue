<script lang="ts" setup>
import { useStyleStore } from "~/store";

const props = defineProps<{
  location: string;
}>();

const { data } = await useWeatherApi(computed(() => props.location));

const styleStore = useStyleStore();

watchEffect(() => {
  if (!data.value) return;
  styleStore.setPrimaryColor(data.value.current.tempC);
});

const hourItems = computed(() => {
  if (!data.value) return [];
  return [...data.value.day[0].hour, ...data.value.day[1].hour];
});

const currentIndex = useClamp(0, 0, hourItems.value.length / 2);

const now = computed(() =>
  Epoch(Date.now() / 1000).getTime(data.value?.location.timezone || "UTC")
);

watchEffect(() => {
  currentIndex.value = hourItems.value.findIndex(
    (hour) =>
      Epoch(hour.time).getTime(data.value?.location.timezone || "UTC") ===
      now.value
  );
});

const wrapper = ref();
const { width } = useElementBounding(wrapper);
const itemWidth = computed(() => Math.max(Math.round(width.value / 5), 144));
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-7 gap-3">
    <template v-if="data">
      <WeatherCard
        class="lg:col-span-2"
        :weather="data.current"
        :label="data.location.name"
      />
      <div
        ref="wrapper"
        class="lg:col-span-5 col-span-1 flex flex-col justify-between"
      >
        <WCarousel
          v-model:active="currentIndex"
          :width="itemWidth"
          :items="hourItems"
          :key="itemWidth"
          :max="24"
        >
          <template #default="{ item }">
            <WeatherTime
              :time="item"
              :timezone="data.location.timezone"
              :now="now"
            />
          </template>
        </WCarousel>

        <div class="grid lg:grid-cols-5 gap-6 mx-3">
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
