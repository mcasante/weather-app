<script lang="ts" setup>
import { useLocationStore } from "~/store";

const route = useRoute();

const location = computed(() => {
  return route.params.location;
});

const locationStore = useLocationStore();

useSeoMeta({
  title: () => `Weather Forecast - ${locationStore.selected?.name}`,
  ogTitle: () => `Weather Forecast - ${locationStore.selected?.name}`,
  description: () => `Weather forecast for ${locationStore.selected?.name}`,
  ogDescription: () => `Weather forecast for ${locationStore.selected?.name}`,
});
</script>

<template>
  <Forecast :location="location as string" />
</template>

<style></style>
