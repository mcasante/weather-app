<script lang="ts" setup>
import type { ForecastDay } from "~/types/model";

const props = defineProps<{
  time: ForecastDay["hour"][0];
  timezone: string;
}>();
</script>

<template>
  <div class="text-center flex flex-col gap-4 items-center">
    <span
      class="text-w-gray font-semibold text-xl"
      v-text="Epoch(props.time.time).getTime(props.timezone)"
    />
    <div
      :class="getColor(props.time.tempC)"
      class="w-[80px] h-[80px] rounded-full flex justify-center items-center transition"
    >
      <img
        :src="props.time.condition.icon"
        :alt="props.time.condition.name"
        class="mx-auto"
      />
    </div>
    <span class="font-semibold text-xl">{{ props.time.tempC }} °C</span>
  </div>
</template>

<style></style>
