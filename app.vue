<script setup lang="ts">
import { useLocationStore, useUserStore } from "~/store";

const route = useRoute();

const location = computed(() => {
  return route.params.location;
});

const userStore = useUserStore();
const greetings = useGreetings();
const locationStore = useLocationStore();

const defaultRoute = {
  name: "All",
  slug: "all",
};

const navigationItems = computed(() => {
  return [
    {
      name: "All 🌎",
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
  ogImage: "/assets/weather-app-logo.svg",
  twitterCard: "summary_large_image",
});

const selected = ref(defaultRoute);

watchEffect(() => {
  if (!isString(location.value)) return;

  selected.value = locationStore.getLocation(location.value) ?? defaultRoute;
});
</script>

<template>
  <NuxtLoadingIndicator
    :throttle="0"
    color="linear-gradient(135deg, #c3e0fb, #cdf0eb, #fff4da, #ffd1d1)"
    :height="8"
  />
  <main class="container px-4 mx-auto py-4 lg:py-16 max-w-[1100px]">
    <h1 class="text-2xl lg:text-5xl font-semibold mb-14 flex items-center">
      <span class="inline-block min-w-max"> {{ greetings }}, </span>
      <TextInput v-model:value="userStore.userName" />
    </h1>

    <div class="flex" v-if="selected">
      <NavigationTabs
        :options="navigationItems"
        v-model:selected="selected"
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

.bg-w-rainbow {
  background-image: linear-gradient(135deg, #c3e0fb, #cdf0eb, #fff4da, #ffd1d1);
  transition: 0;
}
</style>
