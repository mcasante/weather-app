<script lang="ts" setup>
import { useLocationStore } from "~/store";

const locationStore = useLocationStore();

const newLocation = ref("");

const handleCreate = () => {
  locationStore.addLocation(newLocation.value, "name");
  newLocation.value = "";
};

const handleDelete = (location: ILocation) => {
  console.log(location);
  locationStore.deleteLocation(location.slug);
};
</script>

<template>
  <div class="overview">
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
        class="transition-all rounded-lg px-4 py-2 flex items-center gap-2 bg-white px-8 py-6 rounded-l-none hover:bg-w-black border-l-4 border-w-black"
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
        placeholder="Add new location"
        v-model="newLocation"
      />

      <button
        class="transition-all rounded-lg px-4 py-2flex items-center gap-2 bg-white px-8 py-6 rounded-l-none hover:bg-w-green border-l-4 border-w-black w-max"
        @click="handleCreate"
      >
        🗺️
      </button>
    </div>
  </div>
</template>

<style>
.overview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
