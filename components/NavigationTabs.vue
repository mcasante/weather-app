<script lang="ts" setup generic="T, K extends keyof T">
import { useStyleStore } from "~/store";
const styleStore = useStyleStore();

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
const itemWidth = computed(
  () =>
    Math.max(
      ...fixedTargets.value.map((el) => el.getBoundingClientRect().width)
    ) + 10
);

const trackerStyle = computed(() => {
  if (![width.value, left.value, itemWidth.value].every(Boolean)) {
    return { width: "0", transform: "translateX(-100%) translateY(-6px)" };
  }

  const [trackerWidth, translateX, leftOffset] = isOverflowing.value
    ? [itemWidth.value, "-50%", "50%"]
    : [width.value, left.value + "px", "0"];

  return {
    width: `${trackerWidth}px`,
    transform: `translateX(${translateX}) translateY(-6px)`,
    left: leftOffset,
  };
});

const linkClass =
  "text-lg font-semibold px-3 rounded-[10px] transition inline-block";

const hasSwiped = ref(false);
const isMousedown = ref(false);
</script>

<template>
  <div class="overflow-hidden w-full">
    <div
      class="tracker absolute h-[38px] transition-all rounded-[10px] left-0 px-4 z-[-1] ease-in-out duration-300"
      :class="styleStore.primaryColor!.bg"
      :style="trackerStyle"
    />
    <ul
      ref="wrapper"
      class="flex gap-2 w-max"
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
      :key="itemWidth"
      :width="itemWidth"
      :items="options"
      class="!pt-0 !pb-2"
      align="center"
      @update:active="handleSwipe"
    >
      <template #default="{ item, isSwiping }">
        <NuxtLink
          :class="linkClass"
          class="text-center w-full px-0 select-none"
          :id="`carousel-${getKey(item)}`"
          @mousedown="() => (isMousedown = true)"
          @mousemove="
            () => {
              if (isMousedown) hasSwiped = hasSwiped || isSwiping;
            }
          "
          @mouseup="
            () => {
              isMousedown = false;
              if (!hasSwiped) router.push(getKey(item));
              hasSwiped = false;
            }
          "
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
