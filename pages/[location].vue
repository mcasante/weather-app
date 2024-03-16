<script lang="ts" setup>
const route = useRoute();

const location = computed(() => {
  return route.params.location;
});
</script>

<template>
  <Forecast :location="location as string" />
</template>

<style></style>
