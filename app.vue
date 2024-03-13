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
  <main class="container mx-auto py-16">
    <h1 class="text-5xl font-semibold mb-14">{{ greetings }}</h1>

    <div>
      <NavigationTabs :options="locations" v-slot="{ selected }">
        <Forecast :location="selected" />
      </NavigationTabs>
    </div>
  </main>
</template>
