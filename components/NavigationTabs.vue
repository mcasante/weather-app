<script lang="ts" setup generic="T, K extends keyof T">
import { useStyleStore } from "~/store";

const props = defineProps<{
  options: T[];
  selected: T;
  id: K;
  label: K;
}>();

const router = useRouter();

const handleSwipe = (value: number) => {
  const selected = props.options[value];
  if (!selected) return;
  if (typeof selected === "string") return router.push(selected);
  router.push(selected[props.id] as string);
};

const getKey = (option: T): string => {
  if (typeof option === "string") return option;
  return option[props.id] as string;
};

const getLabel = (option: T): string => {
  if (typeof option === "string") return option;
  return option[props.label] as string;
};

const { width: windowWidth } = useWindowSize();
const wrapper = ref<HTMLElement>();

const { width: wrapperWidth } = useElementBounding(() => wrapper.value);

const isOverflowing = computed(() => {
  return wrapperWidth.value > windowWidth.value;
});

const selected = computed(() => props.selected);

const styleStore = useStyleStore();

const target = ref<HTMLElement | null>();

watchEffect(
  () => {
    if (!document) return;
    const type = isOverflowing.value ? "carousel" : "fixed";
    target.value = document.getElementById(`${type}-${getKey(selected.value)}`);
  },
  { flush: "post" }
);

const { width, left } = useElementBounding(target);

const fixedTargets = ref<HTMLElement[]>([]);
const itemWidth = computed(() =>
  Math.max(...fixedTargets.value.map((el) => el.getBoundingClientRect().width))
);

watchEffect(
  () => {
    if (!width.value || !left.value) {
      return;
    }

    const [w, l] = isOverflowing.value
      ? [itemWidth.value, windowWidth.value / 2 - itemWidth.value / 2]
      : [width.value, left.value];

    styleStore.setTrackerStyle(w, l);
  },
  { flush: "post" }
);

const linkClass =
  "text-lg font-semibold px-3 rounded-[10px] transition w-max inline-block";
</script>

<template>
  <div class="overflow-hidden max-w-full">
    <div
      class="absolute h-[38px] transition-all rounded-[10px] left-0 px-4 z-[-1] ease-in-out duration-300"
      :class="styleStore.primaryColor"
      :style="styleStore.trackerStyle"
    />
    <ul
      ref="wrapper"
      class="flex gap-2 pb-4 w-max"
      :class="{
        'absolute pointer-events-none invisible': isOverflowing,
      }"
    >
      <li ref="fixedTargets" v-for="option in options" :key="getKey(option)">
        <NuxtLink
          :class="linkClass"
          :to="getKey(option)"
          :id="`fixed-${getKey(option)}`"
          class="w-max"
        >
          {{ getLabel(option) }}
        </NuxtLink>
      </li>
    </ul>
    <WCarousel
      v-show="isOverflowing"
      :active="selected"
      @update:active="handleSwipe"
      :width="itemWidth"
      :items="options"
      align="center"
      class="!pt-0"
      :key="itemWidth"
    >
      <template #default="{ item }">
        <NuxtLink
          :class="linkClass"
          class="text-center w-full"
          :to="getKey(item)"
          :id="`carousel-${getKey(item)}`"
        >
          {{ getLabel(item) }}
        </NuxtLink>
      </template>
    </WCarousel>
    <div class="py-6">
      <slot :selected="selected"></slot>
    </div>
  </div>
</template>
