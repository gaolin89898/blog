<template>
  <div style="width: 100%; height: 500px; margin-top: 20px">
    <a-row>
      <a-col :span="12">
        <template v-for="item in form">
          <a-form
            :model="item"
            :label-col-props="{ span: 12 }"
            :wrapper-col-props="{ span: 12 }"
            label-align="left"
            v-if="item.isActive == '0'"
          >
            <a-scrollbar
              style="width: 100%; height: 500px; overflow: auto"
              type="track"
            >
              <a-form-item
                label="isActive"
                label-col-flex="80px"
                tooltip="确定组件是否应处于活动状态"
              >
                <a-radio-group v-model:modelValue="item.isActive">
                  <a-radio value="0">是</a-radio>
                  <a-radio value="1">否</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item
                label="preventActiveBehavior"
                label-col-flex="170px"
                tooltip="通过单击组件并单击组件区域外部来禁用组件的行为。"
              >
                <a-radio-group v-model:modelValue="item.preventActiveBehavior">
                  <a-radio value="0">是</a-radio>
                  <a-radio value="1">否</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item
                label="parentW"
                label-col-flex="80px"
                tooltip="定义父元素的初始宽度。 如果未指定，则自动计算。"
              >
                <a-input-number
                  v-model="item.parentW"
                  hide-button
                ></a-input-number>
              </a-form-item>
              <a-form-item
                label="parentH"
                label-col-flex="80px"
                tooltip="定义父元素的初始高度。 如果未指定，则自动计算"
              >
                <a-input-number
                  v-model="item.parentH"
                  hide-button
                ></a-input-number>
              </a-form-item>
              <a-form-item
                label="parentScaleX"
                label-col-flex="110px"
                tooltip="定义初始水平比例或父元素"
              >
                <a-input-number
                  v-model="item.parentScaleX"
                  hide-button
                ></a-input-number>
              </a-form-item>
              <a-form-item
                label=" parentScaleY "
                label-col-flex="110px"
                tooltip="定义初始垂直比例或父元素。"
              >
                <a-input-number
                  v-model="item.parentScaleY"
                  hide-button
                ></a-input-number>
              </a-form-item>
              <a-form-item
                label="isDraggable"
                label-col-flex="100px"
                tooltip="确定组件是否应可拖动"
              >
                <a-radio-group v-model:modelValue="item.isDraggable">
                  <a-radio value="0">是</a-radio>
                  <a-radio value="1">否</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item
                label="isResizable"
                label-col-flex="100px"
                tooltip="确定组件是否应调整大小"
              >
                <a-radio-group v-model:modelValue="item.isResizable">
                  <a-radio value="0">是</a-radio>
                  <a-radio value="1">否</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item
                label="parentLimitation"
                label-col-flex="130px"
                tooltip="范围限制为其父大小"
              >
                <a-radio-group v-model:modelValue="item.parentLimitation">
                  <a-radio value="0">是</a-radio>
                  <a-radio value="1">否</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item
                label="snapToGrid"
                label-col-flex="100px"
                tooltip="确定组件是否应按预定义的步骤移动和调整大小"
              >
                <a-radio-group v-model:modelValue="item.snapToGrid">
                  <a-radio value="0">是</a-radio>
                  <a-radio value="1">否</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item
                label="gridX"
                label-col-flex="60px"
                tooltip="定义水平轴的网格步长。"
              >
                <a-input-number
                  v-model="item.gridX"
                  hide-button
                ></a-input-number>
              </a-form-item>
              <a-form-item
                label="gridY"
                label-col-flex="60px"
                tooltip="定义垂直轴的网格步长。"
              >
                <a-input-number
                  v-model="item.gridY"
                  hide-button
                ></a-input-number>
              </a-form-item>
              <a-form-item
                label="aspectRatio"
                label-col-flex="100px"
                tooltip="确定组件是否应保留其比例"
              >
                <a-radio-group v-model:modelValue="item.aspectRatio">
                  <a-radio value="0">是</a-radio>
                  <a-radio value="1">否</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item
                label="w"
                label-col-flex="50px"
                tooltip="定义组件的初始宽度"
              >
                <a-input-number v-model="item.w" hide-button></a-input-number>
              </a-form-item>
              <a-form-item
                label="h"
                label-col-flex="50px"
                tooltip="定义组件的初始高度"
              >
                <a-input-number v-model="item.h" hide-button></a-input-number>
              </a-form-item>
              <a-form-item
                label="minw"
                label-col-flex="60px"
                tooltip="最小宽度"
              >
                <a-input-number
                  v-model="item.minw"
                  hide-button
                ></a-input-number>
              </a-form-item>
              <a-form-item
                label="minh"
                label-col-flex="60px"
                tooltip="最小高度"
              >
                <a-input-number
                  v-model="item.minh"
                  hide-button
                ></a-input-number>
              </a-form-item>
              <a-form-item
                label="x"
                label-col-flex="50px"
                tooltip="组件初始 x 位置"
              >
                <a-input-number v-model="item.x" hide-button></a-input-number>
              </a-form-item>
              <a-form-item
                label="y"
                label-col-flex="50px"
                tooltip="组件初始 y 位置"
              >
                <a-input-number v-model="item.y" hide-button></a-input-number>
              </a-form-item>
              <a-form-item
                label="z"
                label-col-flex="50px"
                tooltip="组件初始 z 位置"
              >
                <a-input-number v-model="item.z" hide-button></a-input-number>
              </a-form-item>
              <a-form-item
                label="stickSize"
                label-col-flex="80px"
                tooltip="棍棒尺寸"
              >
                <a-input-number
                  v-model="item.stickSize"
                  hide-button
                ></a-input-number>
              </a-form-item>
              <a-form-item
                label="sticks"
                label-col-flex="60px"
                tooltip="定义句柄数组以限制元素大小调整"
              >
                <a-select v-model="item.sticks" multiple>
                  <a-option>tl</a-option>
                  <a-option>tr</a-option>
                  <a-option>tm</a-option>
                  <a-option>mr</a-option>
                  <a-option>br</a-option>
                  <a-option>bm</a-option>
                  <a-option>bl</a-option>
                  <a-option>ml</a-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="axis"
                label-col-flex="60px"
                tooltip="定义元素可拖动的轴。"
              >
                <a-input v-model="item.axis"></a-input>
              </a-form-item>
              <a-form-item
                label="dragHandle"
                label-col-flex="100px"
                tooltip="用于拖动组件的选择器"
              >
                <a-input v-model="item.axis"></a-input>
              </a-form-item>
              <a-form-item
                label="dragCancel"
                label-col-flex="100px"
                tooltip="用于防止拖动初始化的选择器"
              >
                <a-input v-model="item.axis"></a-input>
              </a-form-item>
              <a-form-item
                label="contentClass"
                label-col-flex="110px"
                tooltip="定义一个类，应用于带有 vdr 类的 div"
              >
                <a-input v-model="item.axis"></a-input>
              </a-form-item>
            </a-scrollbar>
          </a-form>
        </template>
      </a-col>
      <a-col :span="10" :offset="1">
        <div style="position: relative; width: 100%; height: 100%">
          <VueDragResize
            v-for="item in form"
            :isActive="item.isActive == '0' ? true : false"
            :w="item.w"
            :h="item.h"
            :parentH="item.parentH"
            :isDraggable="item.isDraggable == '0' ? true : false"
            :isResizable="item.isResizable == '0' ? true : false"
            :parentLimitation="item.parentLimitation == '0' ? true : false"
            :gridX="item.gridX"
            :gridY="item.gridY"
            :x="item.x"
            :y="item.y"
            :z="item.z"
            :sticks="item.sticks"
            @resizing="resize"
            @dragging="resize"
            :style="{
              position: 'absolute',
              background: `${item.color}`,
            }"
          >
            <!-- <h3>Hello World!</h3>
      <p>{{ top }} х {{ left }}</p>
      <p>{{ width }} х {{ height }}</p> -->
          </VueDragResize>
        </div>
      </a-col>
    </a-row>
  </div>
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
  Input as AInput,
  Radio as ARadio,
  Scrollbar as AScrollbar,
  RadioGroup as ARadioGroup,
  InputNumber as AInputNumber,
  Select as ASelect,
  Option as AOption,
} from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";

const form = ref([
  {
    isActive: "0",
    preventActiveBehavior: "1",
    parentW: 0,
    parentH: 500,
    parentScaleX: 1,
    parentScaleY: 1,
    isDraggable: "0",
    isResizable: "0",
    parentLimitation: "0",
    snapToGrid: "1",
    gridX: 50,
    gridY: 50,
    aspectRatio: "1",
    w: 80,
    h: 80,
    minw: 30,
    minh: 30,
    x: 0,
    y: 0,
    z: 3,
    stickSize: 8,
    sticks: [],
    axis: "",
    color: "green",
  },
  {
    isActive: "1",
    preventActiveBehavior: "1",
    parentW: 0,
    parentH: 500,
    parentScaleX: 1,
    parentScaleY: 1,
    isDraggable: "0",
    isResizable: "1",
    parentLimitation: "0",
    snapToGrid: "1",
    gridX: 80,
    gridY: 80,
    aspectRatio: "1",
    w: 80,
    h: 80,
    minw: 30,
    minh: 30,
    x: 70,
    y: 70,
    z: 2,
    stickSize: 8,
    sticks: [],
    axis: "",
    color: "red",
  },
]);

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

<style>
.arco-scrollbar-track-direction-vertical {
  width: 8px;
}
.arco-scrollbar-thumb-direction-vertical .arco-scrollbar-thumb-bar {
  width: 3px;
}
</style>
