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
  <main
    class="container max-w-[1100px] w-full h-dvh flex flex-col mx-auto py-4 lg:py-16"
  >
    <h1 class="text-2xl mx-4 lg:text-5xl font-semibold mb-14 flex items-center">
      <span class="inline-block min-w-max"> {{ greetings }}, </span>
      <WNameInput v-model:value="userStore.userName" />
    </h1>

    <WTabs
      v-if="selected"
      :options="navigationItems"
      v-model:selected="selected"
      id="slug"
      label="name"
      class="flex-grow"
    >
      <NuxtPage page-key="unique" />
    </WTabs>
  </main>
</template>

<style>
html,
body,
#__nuxt {
  overflow-x: hidden;
  width: 100%;
  overscroll-behavior: none;
  min-height: 100dvh;
}

body {
  font-family: "Inter";
  @apply relative text-w-black font-semibold;
}

.bg-w-rainbow {
  background-image: linear-gradient(135deg, #c3e0fb, #cdf0eb, #fff4da, #ffd1d1);
}
</style>
