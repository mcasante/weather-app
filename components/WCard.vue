<script lang="ts" setup>
import type { Weather } from "~/types/model";

const props = defineProps<{
  weather: Weather;
  label: string;
  small?: boolean;
}>();

const weather = computed(() => props.weather);
const color = computed(() => getColor(weather.value.tempC));

const sizeClass = computed(() => (props.small ? "small" : "large"));
</script>

<template>
  <div class="card" :class="[color.bg, sizeClass].join(' ')">
    <div class="icon__wrapper">
      <NuxtImg
        class="icon__image"
        :src="weather.condition.icon"
        :alt="weather.condition.name"
      />
    </div>
    <div class="info ml-4 lg:ml-0">
      <h2>{{ props.label }}</h2>
      <span :class="{ '!mt-0': props.small }">
        {{ weather.condition.name }}
      </span>
    </div>

    <div class="temperature">
      <span>{{ weather.tempC }}</span>
      <small> °C </small>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply flex lg:flex-col items-center;
  @apply rounded-3xl lg:text-center transition;
  @apply py-4 px-6;

  .icon__wrapper {
    @apply flex justify-center items-center flex-shrink-0 relative;
    @apply w-[50px] h-[50px];
    z-index: 0;
  }

  .icon__image {
    @apply w-[48px] h-[48px];
  }
}

.card.large {
  @apply px-4 items-center lg:py-12 lg:px-14;

  .icon__image {
    @apply lg:w-[60px] lg:h-[60px] w-[36px] h-[36px];
  }

  .icon__wrapper {
    @apply lg:w-[100px] lg:h-[100px] w-[60px] h-[60px];

    &::before {
      @apply absolute inset-0 rounded-full;
      content: "";
      background-color: v-bind("color.hex");
      z-index: -2;
    }

    &::after {
      @apply absolute inset-0 rounded-full;
      content: "";
      background-color: rgba(0, 0, 0, 0.3);
      mix-blend-mode: overlay;
      z-index: -1;
    }
  }
}

.info {
  @apply flex flex-col;

  h2 {
    @apply font-semibold mt-2 text-lg leading-none;
  }

  span {
    @apply text-xs lg:mt-2 text-w-gray font-semibold inline-block;
  }
}

.large .info {
  h2 {
    @apply text-xl lg:text-3xl lg:mt-4;
  }
}

.temperature {
  @apply flex font-semibold ml-auto lg:ml-0 lg:mt-6;

  span {
    @apply text-xl;
  }

  small {
    @apply text-xl;
  }
}

.large .temperature {
  @apply lg:mt-12;

  span {
    @apply lg:text-[120px] text-[52px] lg:leading-[120px] leading-[47px];
  }

  small {
    @apply text-xl lg:text-3xl lg:mt-4;
  }
}
</style>
