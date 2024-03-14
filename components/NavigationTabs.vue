<script lang="ts" setup>
import { useAppStore } from "~/store";

const props = defineProps<{
  options: string[];
}>();

const appStore = useAppStore();

const selected = ref<string>(props.options[0]);
</script>

<template>
  <ul class="flex gap-2">
    <li v-for="option in options" :key="option">
      <a
        class="text-lg font-semibold px-3 py-2 rounded-[10px]"
        :class="{ [appStore.primaryColor]: option === selected }"
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
