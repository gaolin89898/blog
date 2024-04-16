<template>
  <ClientOnly>
    <div style="width: 100%; height: 500px; margin-top: 20px">
      <a-row>
        <a-col :span="5">
          <a-form :model="form" layout="vertical">
            <a-form-item label="位置" tooltip="组件初始 x，y 位置">
              <div
                style="
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                "
              >
                <div style="width: 48%">
                  <span style="font-size: 10px">top(x)</span>
                  <a-input-number v-model="form.x" hide-button></a-input-number>
                </div>
                <div style="width: 48%">
                  <span style="font-size: 10px">left(y)</span>
                  <a-input-number v-model="form.y" hide-button></a-input-number>
                </div>
              </div>
            </a-form-item>
            <a-form-item label="大小" tooltip="组件初始 w，h 大小">
              <div
                style="
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                "
              >
                <div style="width: 48%">
                  <span style="font-size: 10px">w</span>
                  <a-input-number v-model="form.w" hide-button></a-input-number>
                </div>
                <div style="width: 48%">
                  <span style="font-size: 10px">h</span>
                  <a-input-number v-model="form.h" hide-button></a-input-number>
                </div>
              </div>
            </a-form-item>
            <a-form-item label="最小大小" tooltip="最小宽度，最小高度">
              <div
                style="
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                "
              >
                <div style="width: 48%">
                  <span style="font-size: 10px">minw</span>
                  <a-input-number
                    v-model="form.minw"
                    hide-button
                  ></a-input-number>
                </div>
                <div style="width: 48%">
                  <span style="font-size: 10px">minh</span>
                  <a-input-number
                    v-model="form.minh"
                    hide-button
                  ></a-input-number>
                </div>
              </div>
            </a-form-item>
            <a-form-item label="配置" :content-flex="false">
              <a-checkbox v-model="form.isResizable">isResizable</a-checkbox>
              <a-checkbox v-model="form.isDraggable">isDraggable</a-checkbox>
              <a-checkbox v-model="form.snapToGrid">snapToGrid</a-checkbox>
              <a-checkbox v-model="form.parentLimitation"
                >parentLimitation</a-checkbox
              >
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :span="18" :offset="1">
          <div style="position: relative; width: 100%; height: 100%">
            <VueDragResize
              v-for="(item, index) in data"
              :isActive="item.isActive"
              :w="item.w"
              :h="item.h"
              :parentH="500"
              :isDraggable="item.isDraggable"
              :isResizable="item.isResizable"
              :parentLimitation="item.parentLimitation"
              :x="item.x"
              :y="item.y"
              :z="item.z"
              :minw="item.minw"
              :minh="item.minh"
              :sticks="item.sticks"
              @resizing="(newRect) => resize(newRect, item)"
              @dragging="(newRect) => resize(newRect, item)"
              :style="{
                position: 'absolute',
                background: `${item.color}`,
              }"
              @activated="activated(item, index)"
            >
            </VueDragResize>
          </div>
        </a-col>
      </a-row>
    </div>
    
  </ClientOnly>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import VueDragResize from "vue-drag-resize/src";
import {
  Row as ARow,
  Col as ACol,
  Checkbox as ACheckbox,
  Form as AForm,
  FormItem as AFormItem,
  InputNumber as AInputNumber,
} from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";

const form = ref<{
  isActive?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  parentLimitation?: boolean;
  snapToGrid?: boolean;
  w?: number;
  h?: number;
  minw?: number;
  minh?: number;
  x?: number;
  y?: number;
  z?: number;
  sticks?: string[];
  color?: string;
}>({});

const data = ref([
  {
    isActive: false,
    isDraggable: true,
    isResizable: true,
    parentLimitation: true,
    snapToGrid: false,
    w: 80,
    h: 80,
    minw: 30,
    minh: 30,
    x: 0,
    y: 0,
    z: 1,
    sticks: [],
    color: "rgb(239, 154, 154)",
  },
  {
    isActive: false,
    isDraggable: true,
    isResizable: true,
    parentLimitation: true,
    snapToGrid: false,
    w: 80,
    h: 80,
    minw: 30,
    minh: 30,
    x: 90,
    y: 0,
    z: 1,
    sticks: [],
    color: "rgb(174, 213, 129)",
  },
  {
    isActive: false,
    isDraggable: true,
    isResizable: true,
    parentLimitation: true,
    snapToGrid: false,
    w: 80,
    h: 80,
    minw: 30,
    minh: 30,
    x: 0,
    y: 90,
    z: 1,
    sticks: [],
    color: "rgb(129, 212, 250)",
  },
]);

const resize = (newRect, item) => {
  form.value.w = newRect.width;
  form.value.h = newRect.height;
  form.value.x = newRect.top;
  form.value.y = newRect.left;

  item.w = newRect.width;
  item.h = newRect.height;
  item.x = newRect.top;
  item.y = newRect.left;
};

const activated = (item, index) => {
  activateItem(item, index);
};

function activateItem(item, index) {
  data.value.forEach((v, i) => {
    if (i == index) {
      v.isActive = true;
      v.sticks = ["tl", "tm", "tr", "mr", "br", "bm", "bl", "ml"];
      form.value = item;
    } else {
      v.isActive = false;
      v.sticks = [];
    }
  });
}
</script>

<style>
.arco-scrollbar-track-direction-vertical {
  width: 8px;
}
.arco-scrollbar-thumb-direction-vertical .arco-scrollbar-thumb-bar {
  width: 3px;
}
</style>
