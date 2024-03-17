<script lang="ts" setup>
import { useLocationStore } from "~/store";

const locationStore = useLocationStore();

const newLocation = ref("");

const handleCreate = () => {
  if (!newLocation.value) return;
  locationStore.addLocation(newLocation.value, "name");
  newLocation.value = "";
};

const handleDelete = (location: ILocation) => {
  locationStore.deleteLocation(location.slug);
};
</script>

<template>
  <div class="overview">
    <div class="card bg-w-rainbow">
      <input
        class="location"
        placeholder="Add new location"
        v-model="newLocation"
        @keypress.enter="handleCreate"
      />

      <button @click="handleCreate">🗺️</button>
    </div>

    <div
      v-for="location in locationStore.list"
      class="card bg-w-rainbow"
      :key="location.slug"
    >
      <NuxtLink class="location" :to="location.slug">
        {{ location.name }}
      </NuxtLink>

      <button @click="() => handleDelete(location)">❌</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  @apply gap-4;
}

.card {
  @apply rounded-2xl flex items-center justify-between overflow-hidden border-2 border-w-gray;

  .location {
    @apply transition-all rounded-lg px-4 py-2 m-4 hover:px-8 hover:py-6 hover:m-0 font-semibold hover:grow hover:rounded-r-none bg-white;
    @apply overflow-hidden max-w-full truncate;

    &:is(input) {
      @apply outline-none w-full;
    }
  }

  button {
    @apply transition-all rounded-lg px-4 py-2 flex items-center gap-2 bg-white px-8 py-6 rounded-l-none hover:bg-w-black border-l-2 border-w-gray duration-300 ease-in-out;
  }
}
</style>
