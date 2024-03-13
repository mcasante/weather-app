<script lang="ts" setup>
const props = defineProps<{
  options: string[];
}>();

const selected = ref<string>(props.options[0]);
</script>

<template>
  <ul class="flex gap-2">
    <li v-for="option in options" :key="option">
      <a
        class="text-lg font-semibold px-3 py-2 rounded-[10px]"
        :class="{ 'bg-w-blue-200': option === selected }"
        @click="selected = option"
      >
        {{ option }}
      </a>
    </li>
  </ul>
  <div class="py-10">
    <slot :selected="selected"></slot>
  </div>
</template>

<style></style>
