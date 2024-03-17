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

const colors = Object.values(getAllColors());

watchEffect(() => {
  if (location.value === "all") {
    styleStore.setPrimaryColor(8);
  }
});

const handleDelete = (location: ILocation) => {
  console.log(location);
  locationStore.deleteLocation(location.slug);
};
</script>

<template>
  <div class="all-page" v-if="location === 'all'">
    <div
      v-for="(location, index) in locationStore.list"
      class="rounded-2xl flex items-center justify-between overflow-hidden border-4 border-w-black bg-w-rainbow"
      :key="location.slug"
    >
      <NuxtLink
        class="transition-all rounded-lg px-4 py-2 m-4 hover:px-8 hover:py-6 hover:m-0 font-semibold hover:grow hover:rounded-r-none bg-white"
        :to="location.slug"
      >
        {{ location.name }}
      </NuxtLink>

      <button
        class="transition-all rounded-lg px-4 py-2 m-4 ml-0 flex items-center gap-2 bg-white m-0 px-8 py-6 rounded-l-none hover:bg-w-black border-l-4 border-w-black"
        @click="() => handleDelete(location)"
      >
        ❌
      </button>
    </div>

    <div
      class="rounded-2xl flex items-center justify-between overflow-hidden border-4 border-w-black bg-w-rainbow"
    >
      <input
        class="transition-all rounded-lg px-4 py-2 m-4 hover:px-8 hover:py-6 hover:m-0 font-semibold hover:grow hover:rounded-r-none bg-white outline-none w-full"
      />

      <button
        class="transition-all rounded-lg px-4 py-2 m-4 ml-0 flex items-center gap-2 bg-white m-0 px-8 py-6 rounded-l-none hover:bg-w-green border-l-4 border-w-black w-max"
      >
        🗺️
      </button>
    </div>
  </div>
  <Forecast v-else :location="location as string" />
</template>

<style scoped>
.all-page {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
