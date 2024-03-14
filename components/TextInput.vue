<script setup lang="ts">
const props = defineProps<{
  value: string;
}>();

const target = ref();
const { focused } = useFocus(target);

const text = ref(props.value);

const emit = defineEmits<{
  (event: "update:value", value: string): void;
}>();

const handleInput = (e: InputEvent) => {
  text.value = (e.target as HTMLSpanElement).innerText;
  emit("update:value", text.value);
};
</script>

<template>
  <span
    ref="target"
    class="editable-span relative p-2 inline-block border-2 rounded-lg outline-none min-h-full"
    contenteditable
    @keypress.enter="focused = false"
    @input="(e) => handleInput(e as InputEvent)"
    :class="{
      'border-w-blue-200': focused,
      'border-transparent': !focused,
    }"
    tabindex="0"
  >
    {{ props.value }}
    <button
      v-if="!props.value && !focused"
      @click="focused = true"
      class="text-w-blue-100"
    >
      type your name
    </button>
  </span>
</template>

<style scoped>
.editable-span:after {
  content: "edit";
  position: absolute;
  right: -8px;
  bottom: 4px;
  transform: translateX(100%);
  @apply text-3xl text-transparent transition;
}

.editable-span:hover:after {
  @apply text-w-gray;
}

.editable-span:hover:focus:after {
  @apply text-transparent;
}
</style>
