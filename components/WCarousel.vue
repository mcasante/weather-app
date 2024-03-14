<script lang="ts" setup>
interface Carousel<T> {
  items: T[];
  active: number;
  maxWidth?: number;
  width?: number;
  align?: "center" | "start" | "end";
  min?: number;
  max?: number;
}

const props = withDefaults(defineProps<Carousel<any>>(), {
  align: "start",
});

const emit = defineEmits<{
  (event: "update:active", value: number): void;
  (event: "click", value: any): void;
}>();

const carousel = ref();
const numItems = computed(() => props.items.length);

const {
  isSwiping,
  lengthX,
  currentIndex,
  boundings,
  itemWidth,
  containerWidth,
} = useCarousel(carousel, numItems, {
  maxWidth: props.maxWidth,
  width: props.width,
  currentIndex: useClamp(
    props.active,
    props.min ?? 0,
    props.max ?? numItems.value - 1
  ),
});

watch(
  () => props.active,
  () => {
    currentIndex.value = props.active;
  },
  { immediate: true }
);

watch(currentIndex, () => {
  emit("update:active", currentIndex.value);
});

const translation = computed(() => {
  console.log(currentIndex.value);
  const dragged = isSwiping.value ? lengthX.value : 0;
  const translateX = -(currentIndex.value * itemWidth.value);

  const startPoint = {
    center: boundings.width.value / 2 - itemWidth.value / 2,
    start: 0,
    end: boundings.width.value - itemWidth.value,
  };
  return startPoint[props.align] + translateX - dragged;
});

const containerStyles = computed(() => ({
  ...(isSwiping.value ? { transition: "none" } : {}),
  transform: `translateX(${translation.value}px)`,
  width: `${containerWidth.value}px`,
}));
</script>

<template>
  <div ref="carousel" class="carousel">
    <div
      ref="container"
      class="carousel-container"
      :style="{ ...containerStyles }"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="carousel-item"
        :class="{ active: index === currentIndex }"
      >
        <slot
          :item="item"
          :index="index"
          :is-swiping="isSwiping"
          :active-index="currentIndex"
          @click="emit('click', item)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  @apply relative overflow-hidden w-auto py-8;
}

.carousel-container {
  @apply max-w-none flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  @apply w-full;
  box-sizing: border-box;
  transition: transform 0.5s ease-in-out;
}
</style>
