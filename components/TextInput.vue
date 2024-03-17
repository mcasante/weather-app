<script setup lang="ts">
import { useStyleStore } from "~/store";

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

const styleStore = useStyleStore();
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
    background-color: v-bind("styleStore.primaryColor.hex");
    opacity: v-bind("opacity");
    @apply absolute left-2 bottom-0 h-1 w-20 transition-all rounded-md;
  }

  &:hover:after {
    opacity: 1;
  }
}
</style>
