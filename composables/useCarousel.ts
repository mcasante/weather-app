import type { Ref } from "vue";
import { useClamp } from "@vueuse/math";
import type { UseSwipeReturn, UsePointerSwipeReturn } from "@vueuse/core";

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

  const handleSwipe = (swipe: UseSwipeReturn | UsePointerSwipeReturn) => {
    const distance =
      (swipe as UseSwipeReturn)?.lengthX?.value ||
      (swipe as UsePointerSwipeReturn).distanceX.value;

    const tolerance = Math.sign(distance) * 0.4;

    const draggedSlides = Math.round(distance / itemWidth.value + tolerance);

    currentIndex.value += draggedSlides;
  };

  const isTouchDevice = useMediaQuery("(pointer: coarse)");

  const useSmartSwipe = computed(() =>
    isTouchDevice.value ? useSwipe : usePointerSwipe
  );

  const swipe = computed<UseSwipeReturn | UsePointerSwipeReturn>(() => {
    const s: UseSwipeReturn | UsePointerSwipeReturn = useSmartSwipe.value(
      target,
      {
        threshold: 10,
        onSwipeEnd: () => handleSwipe(s),
        pointerTypes: ["mouse"],
      }
    );

    return s;
  });

  return {
    currentIndex,
    isSwiping: swipe.value.isSwiping,
    lengthX:
      (swipe.value as UseSwipeReturn).lengthX ??
      (swipe.value as UsePointerSwipeReturn).distanceX,
    boundings,
    itemWidth,
    containerWidth,
  };
}
