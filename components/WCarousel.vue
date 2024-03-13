<script lang="ts" setup>
interface Carousel<T> {
  items: T[];
  active: number;
  maxWidth?: number;
  width?: number;
}

const props = defineProps<Carousel<any>>();
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
});

watch(
  () => props.active,
  () => {
    currentIndex.value = props.active;
  },
  { immediate: true }
);

watch(currentIndex, (value) => {
  emit("update:active", value);
});

const translation = computed(() => {
  const dragged = isSwiping.value ? lengthX.value : 0;
  const translateX = -(currentIndex.value * itemWidth.value);
  const startPoint = boundings.width.value / 2 - itemWidth.value / 2;
  return startPoint + translateX - dragged;
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
