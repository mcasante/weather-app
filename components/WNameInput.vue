<script setup lang="ts">
const props = defineProps<{
  value: string;
}>();

const text = ref(props.value);
const target = ref();
const { focused } = useFocus(target);

const emit = defineEmits<{
  (event: "update:value", value: string): void;
}>();

watch(text, (value) => {
  emit("update:value", value);
});

const opacity = computed(() => (focused.value ? 1 : 0));
</script>

<template>
  <div class="relative w-full">
    <input
      ref="target"
      type="text"
      v-model="text"
      class="transition-all px-2 block rounded-lg outline-none border-transparent w-full"
      placeholder="Type your name"
      @keypress.enter="focused = false"
    />
  </div>
</template>

<style scoped lang="scss">
div {
  &:after {
    content: "";
    opacity: v-bind("opacity");
    background-image: linear-gradient(
      -45deg,
      #c3e0fb,
      #cdf0eb,
      #fff4da,
      #ffd1d1
    );
    @apply absolute left-2 bottom-0 h-1 w-20 transition-all rounded-md;
  }

  &:hover:after {
    opacity: 1;
  }
}
</style>
