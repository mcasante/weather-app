<script lang="ts" setup>
import { useAppStore } from "~/store";

const props = defineProps<{
  options: string[];
}>();

const appStore = useAppStore();
const selected = ref<string>(props.options[0]);

const targets = ref<HTMLElement[]>([]);

const trackerStyle = reactive({
  width: "0",
  transform: "translateX(-100%) translateY(-6px)",
});

const { width, left } = useElementBounding(() => {
  const idx = props.options.indexOf(selected.value);
  return targets.value[idx];
});

watchEffect(() => {
  if (!width.value || !left.value) {
    trackerStyle.width = "0";
    trackerStyle.transform = "translateX(-100%) translateY(-6px)";
    return;
  }

  trackerStyle.width = `${width.value}px`;
  trackerStyle.transform = `translateX(${left.value}px) translateY(-6px)`;
});
</script>

<template>
  <div
    class="absolute h-[38px] transition rounded-[10px] left-0 px-4 z-[-1] ease-in-out duration-300"
    :class="appStore.primaryColor"
    :style="trackerStyle"
  />
  <ul class="flex gap-2">
    <li ref="targets" v-for="option in options" :key="option">
      <a
        class="text-lg font-semibold px-3 py-2 rounded-[10px] transition"
        @click="selected = option"
      >
        {{ option }}
      </a>
    </li>
  </ul>
  <div class="py-10">
    <slot :selected="selected"></slot>
  </div>
</template>
