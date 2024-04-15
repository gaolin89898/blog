<template>
  <!-- <ClientOnly>
    
  </ClientOnly> -->
  <div style="width: 100%; height: 500px; border: 1px solid red">
    <div style="width: 100%; height: 100px;display: flex;">
      <a-checkbox>isActive</a-checkbox>
      <a-checkbox>preventActiveBehavior</a-checkbox>
      <a-checkbox>parentW</a-checkbox>
      <a-checkbox>parentH</a-checkbox>
    </div>
    <div style="position: relative; width: 100%; height: 400px">
      <VueDragResize
        :isActive="true"
        :w="100"
        :h="100"
        :parentH="400"
        :parentLimitation="true"
        @resizing="resize"
        @dragging="resize"
        style="position: absolute"
      >
        <!-- <h3>Hello World!</h3>
      <p>{{ top }} х {{ left }}</p>
      <p>{{ width }} х {{ height }}</p> -->
      </VueDragResize>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import VueDragResize from "vue-drag-resize/src";
import { Checkbox as ACheckbox } from "@arco-design/web-vue";
import '@arco-design/web-vue/dist/arco.css';

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
