<template>
  <div id="app">
    <VueDragResize :isActive="true" :w="200" :h="200">
      <h3>Hello World!</h3>
    </VueDragResize>
  </div>
</template>

<script lang="ts" setup>
import VueDragResize from "vue-drag-resize/src";
</script>

<style></style>
