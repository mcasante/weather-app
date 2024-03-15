<script lang="ts" setup generic="T, K extends keyof T">
import { useStyleStore } from "~/store";

const props = defineProps<{
  options: T[];
  selected: T;
  id: K;
  label: K;
}>();

const selected = computed(() => props.selected);

const styleStore = useStyleStore();

const targets = ref<HTMLElement[]>([]);

const getKey = (option: T): string => {
  if (typeof option === "string") return option;
  return option[props.id] as string;
};

const getLabel = (option: T): string => {
  if (typeof option === "string") return option;
  return option[props.label] as string;
};

const { width, left } = useElementBounding(() => {
  if (!props.selected) return;

  if (typeof props.selected === "string") {
    const idx = props.options.findIndex((option) => option === props.selected);
    return targets.value[idx];
  }

  const idx = props.options.findIndex(
    (option) => getKey(option) === getKey(props.selected)
  );
  return targets.value[idx];
});

watchEffect(() => {
  if (!width.value || !left.value) {
    return;
  }

  styleStore.setTrackerStyle(width.value, left.value);
});
</script>

<template>
  <div>
    <div
      class="absolute h-[38px] transition rounded-[10px] left-0 px-4 z-[-1] ease-in-out duration-300"
      :class="styleStore.primaryColor"
      :style="styleStore.trackerStyle"
    />
    <ul class="flex gap-2">
      <li ref="targets" v-for="option in options" :key="getKey(option)">
        <NuxtLink
          class="text-lg font-semibold px-3 py-2 rounded-[10px] transition"
          :to="getKey(option)"
        >
          {{ getLabel(option) }}
        </NuxtLink>
      </li>
    </ul>
    <div class="py-10">
      <slot :selected="selected"></slot>
    </div>
  </div>
</template>
