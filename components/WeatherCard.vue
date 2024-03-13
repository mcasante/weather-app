<script lang="ts" setup>
import type { Weather } from "~/types/model";

const props = defineProps<{
  weather: Weather;
  label: string;
  small?: boolean;
}>();

const weather = computed(() => props.weather);
const color = useWeatherColor(weather.value.tempC);

const styles = computed(() => {
  const small = {
    card: "py-4 px-6".concat(" ", color.value),
    icon: {
      wrapper: "w-[50px] h-[50px]",
      image: "w-[30px] h-[30px]",
    },
    label: "text-xs",
    temperature: {
      wrapper: "mt-6",
      value: "text-xl",
      degree: "text-xl",
    },
  };

  const large = {
    card: "px-4 items-center py-12 px-14".concat(" ", color.value),
    icon: {
      wrapper: "w-[100px] h-[100px] icon-wrapper",
      image: "w-[60px] h-[60px]",
    },
    label: "text-3xl mt-4",
    temperature: {
      wrapper: "mt-12",
      value: "text-[120px] leading-[120px]",
      degree: "text-3xl mt-4",
    },
  };

  return props.small ? small : large;
});
</script>

<template>
  <div
    class="flex flex-col items-center rounded-3xl text-center"
    :class="styles.card"
  >
    <div
      :class="styles.icon.wrapper"
      class="flex justify-center items-center relative"
    >
      <img
        :class="styles.icon.image"
        :src="weather.condition.icon"
        :alt="weather.condition.name"
      />
    </div>
    <h2 class="font-semibold mt-2" :class="styles.label" v-text="props.label" />
    <p
      class="text-xs mt-2 text-w-gray font-semibold"
      :class="{ 'mt-0': props.small }"
      v-text="weather.condition.name"
    />

    <div class="flex font-semibold" :class="styles.temperature.wrapper">
      <span :class="styles.temperature.value" v-text="weather.tempC" />
      <small :class="styles.temperature.degree"> °C </small>
    </div>
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
