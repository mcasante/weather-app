<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    options: string[];
    bgColor?: string;
  }>(),
  { bgColor: "bg-w-blue-200" }
);

const selected = ref<string>(props.options[0]);
</script>

<template>
  <ul class="flex gap-2">
    <li v-for="option in options" :key="option">
      <a
        class="text-lg font-semibold px-3 py-2 rounded-[10px]"
        :class="{ [bgColor]: option === selected }"
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
