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
</script>

<template>
  <input
    ref="target"
    type="text"
    v-model="text"
    class="editable-span transition-all px-2 block border-b-2 outline-none border-transparent w-full focus:border-b-w-blue-200"
    placeholder="Type your name"
    @keypress.enter="focused = false"
  />
</template>
