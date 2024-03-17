<script setup lang="ts">
import { useLocationStore, useUserStore } from "~/store";

const route = useRoute();

const location = computed(() => {
  return route.params.location;
});

const userStore = useUserStore();
const greetings = useGreetings();
const locationStore = useLocationStore();

const navigationItems = computed(() => {
  return [
    {
      name: "All",
      slug: "all",
    },
    ...locationStore.list,
  ];
});

useServerSeoMeta({
  title: "Weather Forecast",
  ogTitle: "Weather Forecast",
  description: "Weather forecast for all locations",
  ogDescription: "Weather forecast for all locations",
  // ogImage: 'https://example.com/image.png',
  // twitterCard: 'summary_large_image',
});

watchEffect(() => {
  if (!isString(location.value)) return;
  locationStore.selectLocation(location.value);
});
</script>

<template>
  <NuxtLoadingIndicator :throttle="0" />
  <main class="container px-4 mx-auto py-4 lg:py-16 max-w-[1100px]">
    <h1 class="text-2xl lg:text-5xl font-semibold mb-14 flex items-center">
      <span class="inline-block min-w-max"> {{ greetings }}, </span>
      <TextInput v-model:value="userStore.userName" />
    </h1>

    <div v-if="locationStore.selected">
      <NavigationTabs
        :options="navigationItems"
        v-model:selected="locationStore.selected"
        id="slug"
        label="name"
      >
        <NuxtPage page-key="unique" />
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
  @apply text-w-black;
}
</style>
