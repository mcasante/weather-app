<script lang="ts" setup>
import type { Weather } from "~/types/model";

const props = defineProps<{
  weather: Weather;
  label: string;
  small?: boolean;
}>();

const weather = computed(() => props.weather);

const styles = computed(() => {
  const small = {
    card: "py-4 px-6".concat(" ", getColor(weather.value.tempC)),
    icon: {
      wrapper: "w-[50px] h-[50px]",
      image: "w-[48px] h-[48px]",
    },
    label: "text-xs",
    temperature: {
      wrapper: "lg:mt-6",
      value: "text-xl",
      degree: "text-xl",
    },
  };

  const large = {
    card: "px-4 items-center py-12 px-14".concat(
      " ",
      getColor(weather.value.tempC)
    ),
    icon: {
      wrapper: "w-[100px] h-[100px] w-[60px] h-[60px] icon-wrapper",
      image: "w-[60px] h-[60px] w-[46px] h-[46px]",
    },
    label: "text-xl lg:text-3xl lg:mt-4",
    temperature: {
      wrapper: "lg:mt-12",
      value: "lg:text-[120px] text-[52px] lg:leading-[120px] leading-[47px]",
      degree: "text-xl lg:text-3xl lg:mt-4",
    },
  };

  return props.small ? small : large;
});
</script>

<template>
  <div
    class="flex lg:flex-col items-center rounded-3xl lg:text-center transition"
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
    <div class="ml-4 lg:ml-0">
      <h2
        class="font-semibold mt-2"
        :class="styles.label"
        v-text="props.label"
      />
      <p
        class="text-xs lg:mt-2 text-w-gray font-semibold"
        :class="{ 'mt-0': props.small }"
        v-text="weather.condition.name"
      />
    </div>

    <div
      class="flex font-semibold ml-auto lg:ml-0"
      :class="styles.temperature.wrapper"
    >
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
