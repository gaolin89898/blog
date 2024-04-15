<template>
  <div style="width: 100%; height: 500px; margin-top: 20px">
    <a-row>
      <a-col :span="11">
        <a-form
          :model="form"
          size="mini"
          :label-col-props="{ span: 12 }"
          :wrapper-col-props="{ span: 12 }"
        >
          <a-scrollbar
            style="width: 100%; height: 500px; overflow: auto"
            type="track"
          >
            <a-form-item label="isActive" tooltip="确定组件是否应处于活动状态">
              <a-radio-group v-model:modelValue="form.isActive">
                <a-radio value="0">是</a-radio>
                <a-radio value="1">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              label="preventActiveBehavior"
              label-col-flex="140px"
              tooltip="通过单击组件并单击组件区域外部来禁用组件的行为。"
            >
              <a-radio-group v-model:modelValue="form.preventActiveBehavior">
                <a-radio value="0">是</a-radio>
                <a-radio value="1">否</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              label="parentW"
              label-col-flex="80px"
              tooltip="定义父元素的初始宽度。 如果未指定，则自动计算。"
            >
              <a-input
                v-model="form.parentW"
                :style="{ width: '50px' }"
              ></a-input>
            </a-form-item>
            <a-form-item
              label="parentH"
              label-col-flex="80px"
              tooltip="定义父元素的初始高度。 如果未指定，则自动计算"
            >
              <a-input
                v-model="form.parentH"
                :style="{ width: '50px' }"
              ></a-input>
            </a-form-item>
            <a-form-item
              label="parentScaleX"
              label-col-flex="110px"
              tooltip="定义初始水平比例或父元素"
            >
              <a-input
                v-model="form.parentScaleX"
                :style="{ width: '50px' }"
              ></a-input>
            </a-form-item>
            <a-form-item
              label=" parentScaleY "
              label-col-flex="110px"
              tooltip="定义初始垂直比例或父元素。"
            >
              <a-input
                v-model="form.parentScaleY"
                :style="{ width: '50px' }"
              ></a-input>
            </a-form-item>
            <a-form-item
              label="isDraggable"
              label-col-flex="100px"
              tooltip="确定组件是否应可拖动"
            >
              <a-radio v-model:modelValue="form.isDraggable"></a-radio>
            </a-form-item>
            <a-form-item
              label="isResizable"
              label-col-flex="100px"
              tooltip="确定组件是否应调整大小"
            >
              <a-radio v-model:modelValue="form.isDraggable"></a-radio>
            </a-form-item>
            <a-form-item
              label="parentLimitation"
              label-col-flex="120px"
              tooltip="范围限制为其父大小"
            >
              <a-radio v-model:modelValue="form.parentLimitation"></a-radio>
            </a-form-item>
            <a-form-item
              label="snapToGrid"
              label-col-flex="100px"
              tooltip="确定组件是否应按预定义的步骤移动和调整大小"
            >
              <a-radio v-model:modelValue="form.snapToGrid"></a-radio>
            </a-form-item>
            <a-form-item
              label="gridX"
              label-col-flex="60px"
              tooltip="定义水平轴的网格步长。"
            >
              <a-input
                v-model="form.gridX"
                :style="{ width: '50px' }"
              ></a-input>
            </a-form-item>
            <a-form-item
              label="gridY"
              label-col-flex="60px"
              tooltip="定义垂直轴的网格步长。"
            >
              <a-input
                v-model="form.gridY"
                :style="{ width: '50px' }"
              ></a-input>
            </a-form-item>
            <a-form-item
              label="aspectRatio"
              label-col-flex="100px"
              tooltip="确定组件是否应保留其比例"
            >
              <a-radio v-model:modelValue="form.aspectRatio"></a-radio>
            </a-form-item>
            <a-form-item
              label="w"
              label-col-flex="50px"
              tooltip="定义组件的初始宽度"
            >
              <a-input v-model="form.w" :style="{ width: '50px' }"></a-input>
            </a-form-item>
            <a-form-item
              label="h"
              label-col-flex="50px"
              tooltip="定义组件的初始高度"
            >
              <a-input v-model="form.h" :style="{ width: '50px' }"></a-input>
            </a-form-item>
            <a-form-item label="minw" label-col-flex="60px" tooltip="最小宽度">
              <a-input v-model="form.minw" :style="{ width: '50px' }"></a-input>
            </a-form-item>
            <a-form-item label="minh" label-col-flex="50px" tooltip="最小高度">
              <a-input v-model="form.minh" :style="{ width: '50px' }"></a-input>
            </a-form-item>
            <a-form-item
              label="x"
              label-col-flex="50px"
              tooltip="组件初始 x 位置"
            >
              <a-input v-model="form.x" :style="{ width: '50px' }"></a-input>
            </a-form-item>
            <a-form-item
              label="y"
              label-col-flex="50px"
              tooltip="组件初始 y 位置"
            >
              <a-input v-model="form.y" :style="{ width: '50px' }"></a-input>
            </a-form-item>
            <a-form-item
              label="z"
              label-col-flex="50px"
              tooltip="组件初始 z 位置"
            >
              <a-input v-model="form.z" :style="{ width: '60px' }"></a-input>
            </a-form-item>
            <a-form-item
              label="stickSize"
              label-col-flex="70px"
              tooltip="棍棒尺寸"
            >
              <a-input
                v-model="form.stickSize"
                :style="{ width: '60px' }"
              ></a-input>
            </a-form-item>
            <a-form-item
              label="sticks"
              label-col-flex="60px"
              tooltip="定义句柄数组以限制元素大小调整"
            >
              <a-input
                v-model="form.sticks"
                :style="{ width: '60px' }"
              ></a-input>
            </a-form-item>
            <a-form-item
              label="axis"
              label-col-flex="60px"
              tooltip="定义元素可拖动的轴。"
            >
              <a-input v-model="form.axis" :style="{ width: '60px' }"></a-input>
            </a-form-item>
            <a-form-item
              label="dragHandle"
              label-col-flex="80px"
              tooltip="用于拖动组件的选择器"
            >
              <a-input v-model="form.axis" :style="{ width: '60px' }"></a-input>
            </a-form-item>
            <a-form-item
              label="dragCancel"
              label-col-flex="80px"
              tooltip="用于防止拖动初始化的选择器"
            >
              <a-input v-model="form.axis" :style="{ width: '60px' }"></a-input>
            </a-form-item>
            <a-form-item
              label="contentClass"
              label-col-flex="90px"
              tooltip="定义一个类，应用于带有 vdr 类的 div"
            >
              <a-input v-model="form.axis" :style="{ width: '60px' }"></a-input>
            </a-form-item>
          </a-scrollbar>
        </a-form>
      </a-col>
      <a-col :span="11" :offset="1">
        <div style="position: relative; width: 100%; height: 100%">
          <VueDragResize
            :isActive="true"
            :w="100"
            :h="100"
            :parentH="500"
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
} from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";

const form = ref({
  isActive: "1",
  preventActiveBehavior: "1",
  parentW: 0,
  parentH: 0,
  parentScaleX: 1,
  parentScaleY: 1,
  isDraggable: true,
  isResizable: true,
  parentLimitation: true,
  snapToGrid: false,
  gridX: 50,
  gridY: 50,
  aspectRatio: false,
  w: 200,
  h: 200,
  minw: 50,
  minh: 50,
  x: 0,
  y: 0,
  z: "auto",
  stickSize: 8,
  sticks: [],
  axis: "",
});

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
