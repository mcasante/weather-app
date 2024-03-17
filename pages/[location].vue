<script lang="ts" setup>
import { useLocationStore, useStyleStore } from "~/store";

const route = useRoute();
const location = computed(() => route.params.location as string);
const locationStore = useLocationStore();

const selected = computed(
  () => locationStore.getLocation(location.value) ?? { name: "All 🌎" }
);

useSeoMeta({
  title: () => `Weather Forecast - ${selected.value.name}`,
  ogTitle: () => `Weather Forecast - ${selected.value.name}`,
  description: () => `Weather forecast for ${selected.value.name}`,
  ogDescription: () => `Weather forecast for ${selected.value.name}`,
});

const styleStore = useStyleStore();

watchEffect(() => {
  if (location.value === "all") {
    styleStore.setPrimaryColor(8);
  }
});
</script>

<template>
  <WOverview v-if="location === 'all'" />
  <WForecast v-else :location="location" />
</template>
