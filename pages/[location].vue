<script lang="ts" setup>
const route = useRoute();

const location = computed(() => {
  return route.params.location;
});

import { useLocationStore, useUserStore } from "~/store";

const userStore = useUserStore();

const greetings = useGreetings();

const locationStore = useLocationStore();

onMounted(() => {
  if (!isString(location.value)) return;
  locationStore.selectLocation(location.value);
});
</script>

<template>
  <main class="container px-4 lg:px-0 mx-auto py-16 max-w-[1100px]">
    <h1 class="text-5xl font-semibold mb-14">
      {{ greetings }}, <TextInput v-model:value.sync="userStore.userName" />
    </h1>

    <div>
      <NavigationTabs
        :options="locationStore.list"
        v-model:selected.sync="locationStore.selected"
        id="slug"
        label="name"
        v-slot="{ selected: value }"
      >
        <Forecast :location="value.slug" />
      </NavigationTabs>
    </div>
  </main>
</template>

<style></style>
