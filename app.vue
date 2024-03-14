<script setup lang="ts">
const userName = ref("user 🌞");
const greetings = useGreetings(userName);

const defaultPlaces = [
  "Denver 🏔",
  "Rio de Janeiro ⛱",
  "Madrid 💃",
  "Japan 🍣",
  "Australia 🐨",
];
const locations = ref<string[]>(defaultPlaces);
</script>

<template>
  <main class="container mx-auto py-16 max-w-[1100px]">
    <h1 class="text-5xl font-semibold mb-14">
      {{ greetings }}, <TextInput v-model:value="userName" />
    </h1>

    <div>
      <NavigationTabs :options="locations" v-slot="{ selected }">
        <Forecast :location="selected" />
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
}
</style>
