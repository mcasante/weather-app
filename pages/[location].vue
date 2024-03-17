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
const { data, error } = await useWeatherApi(location);

watchEffect(() => {
  if (!data.value || location.value === "all") {
    styleStore.setPrimaryColor(8);
    return;
  }
  styleStore.setPrimaryColor(data.value.current.tempC);
});

const router = useRouter();

const handleDelete = () => {
  locationStore.deleteLocation(location.value);
  router.push("/all");
};
</script>

<template>
  <WOverview v-if="location === 'all'" />
  <template v-else>
    <div class="flex justify-center flex-wrap gap-8 py-8" v-if="error">
      <h2 class="w-full text-center text-3xl">
        No matching location found: {{ selected.name }}
      </h2>

      <button
        class="mt-4 border-2 border-w-black rounded-lg px-4 py-2 hover:bg-w-black hover:text-white transition-colors duration-300 ease-in-out"
        @click="handleDelete"
      >
        Delete location
      </button>
    </div>
    <WForecast v-else :data="data!" />
  </template>
</template>
