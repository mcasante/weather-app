import type { Ref } from "vue";
import { useClamp } from "@vueuse/math";

interface Options {
  maxWidth?: number;
  width?: number;
  currentIndex?: Ref<number>;
}

export function useCarousel(
  target: Ref<any>,
  length: Ref<number>,
  options: Options = {}
) {
  const { maxWidth, width, currentIndex } = {
    ...{ currentIndex: useClamp(0, 0, length.value - 1) },
    ...options,
  };

  const boundings = useElementBounding(target);

  const itemWidth = computed(() => {
    if (maxWidth) {
      return Math.min(maxWidth, boundings.width.value);
    } else if (width) {
      return width;
    } else {
      return boundings.width.value;
    }
  });

  const containerWidth = computed(() => length.value * itemWidth.value);

  const { isSwiping, distanceX: lengthX } = usePointerSwipe(target, {
    threshold: 10,
    onSwipeEnd: () => {
      const tolerance = Math.sign(lengthX.value) * 0.4;

      const draggedSlides = Math.round(
        lengthX.value / itemWidth.value + tolerance
      );

      currentIndex.value += draggedSlides;
    },
  });

  return {
    currentIndex,
    isSwiping,
    lengthX,
    boundings,
    itemWidth,
    containerWidth,
  };
}
