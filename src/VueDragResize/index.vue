<template>
  <ClientOnly>
    <VueDragResize
      :isActive="true"
      :w="200"
      :h="200"
      v-on:resizing="resize"
      v-on:dragging="resize"
    >
      <h3>Hello World!</h3>
      <p>{{ top }} х {{ left }}</p>
      <p>{{ width }} х {{ height }}</p>
    </VueDragResize>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import VueDragResize from "vue-drag-resize";


const top = ref(0);
const left = ref(0);
const width = ref(0);
const height = ref(0);

const resize = (newRect) => {
  width.value = newRect.width;
  height.value = newRect.height;
  top.value = newRect.top;
  left.value = newRect.left;
};
</script>
