<script lang="ts" setup>
import type { ForecastDay } from "~/types/model";

const props = defineProps<{
  time: ForecastDay["hour"][0];
  timezone: string;
  now: string;
}>();

const label = computed(() => {
  const time = Epoch(props.time.time).getTime(props.timezone);
  return time === props.now ? "Now" : time;
});
</script>

<template>
  <div
    class="text-center flex flex-col gap-4 items-center select-none pointer-events-none"
  >
    <span class="text-w-gray font-semibold text-xl" v-text="label" />
    <div
      :class="getColor(props.time.tempC)"
      class="w-[80px] h-[80px] rounded-full flex justify-center items-center transition"
    >
      <NuxtImg
        :src="props.time.condition.icon"
        :alt="props.time.condition.name"
        class="mx-auto w-[48px] h-[48px]"
      />
    </div>
    <span class="font-semibold text-xl">{{ props.time.tempC }} °C</span>
  </div>
</template>

<style></style>
