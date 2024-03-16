<script setup lang="ts">
import { useLocationStore, useUserStore } from "~/store";

const route = useRoute();

const userStore = useUserStore();
const greetings = useGreetings();
const locationStore = useLocationStore();

const location = computed(() => {
  return route.params.location;
});

watchEffect(() => {
  if (!isString(location.value)) return;
  locationStore.selectLocation(location.value);
});
</script>

<template>
  <main class="container px-4 lg:px-0 mx-auto py-16 max-w-[1100px]">
    <h1 class="text-2xl lg:text-5xl font-semibold mb-14">
      {{ greetings }}, <TextInput v-model:value.sync="userStore.userName" />
    </h1>

    <div v-if="locationStore.selected">
      <NavigationTabs
        :options="locationStore.list"
        v-model:selected.sync="locationStore.selected"
        id="slug"
        label="name"
        v-slot="{ selected: value }"
      >
        <NuxtPage :location="value.slug" />
      </NavigationTabs>
    </div>
  </main>
</template>

<style>
html,
body,
#__nuxt {
  overflow-x: hidden;
  width: 100%;
  overscroll-behavior: none;
}

body {
  font-family: "Inter";
  font-weight: 500;
  position: relative;
}
</style>
