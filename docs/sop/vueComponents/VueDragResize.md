---
sticky: 1
---

# vue-drag-resize（拖动-调整大小的 vue 组件）

用于可拖动和可调整大小的元素的 vue 组件。

[Github:https://github.com/kirillmurashov/vue-drag-resize](https://github.com/kirillmurashov/vue-drag-resize)

<!-- ![图片](http://picturebed.gaolin.online/blog/Vue-Drag-Resize/image.gif) -->

## 安装

```sh
$ npm i -s vue-drag-resize

```

## 引入

##### 全局引入

```js
import Vue from "vue";
import VueDragResize from "vue-drag-resize";  // [!code focus]
Vue.component("vue-drag-resize", VueDragResize); // [!code focus]
```

##### 组件内引入

```vue
<div id="app">
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
</div>
```

```js
import VueDragResize from "vue-drag-resize";
export default {
  name: "app",
  components: {
    VueDragResize,
  },
  data() {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    };
  },
  methods: {
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
  },
};
```

## API

#### 基本参数

| 参数名                | 描述                                                                                                            | 类型          | 默认值                                           |
| --------------------- | --------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------ |
| isActive              | 确定组件是否应处于活动状态。                                                                                    | boolean       | false                                            |
| preventActiveBehavior | 通过单击组件并单击组件区域外部来禁用组件的行为（isActive：true / false）。 如果启用了 prop，则组件仅面向指定的  | boolean       | false                                            |
| parentW               | 定义父元素的初始宽度。 如果未指定，则自动计算。可以设置组件的边界区域，并在实时调整大小时使用它                 | number        | 0                                                |
| parentH               | 定义父元素的初始高度。 如果未指定，则自动计算。可以设置组件的边界区域，并在实时调整大小时使用它                 | number        | 0                                                |
| parentScaleX          | 定义初始水平比例或父元素。父级的 transform:scale（）css 定义中的值相同。拖动/调整大小和杆的大小将使用该值计算   | number        | 1                                                |
| parentScaleY          | 定义初始垂直比例或父元素。父级的 transform:scale（）css 定义中的值相同。拖动/调整大小和杆的大小将使用该值计算。 | number        | 1                                                |
| isDraggable           | 确定组件是否应可拖动                                                                                            | boolean       | true                                             |
| isResizable           | 确定组件是否应调整大小                                                                                          | boolean       | true                                             |
| parentLimitation      | 将组件更改的范围限制为其父大小                                                                                  | boolean       | false                                            |
| snapToGrid            | 确定组件是否应按预定义的步骤移动和调整大小                                                                      | boolean       | false                                            |
| gridX                 | 定义水平轴的网格步长。组件的两侧（左侧和右侧）将捕捉到此步骤                                                    | nubmer        | 50                                               |
| gridY                 | 定义垂直轴的网格步长。组件的两侧（顶部和底部）将捕捉到此步骤                                                    | nubmer        | 50                                               |
| aspectRatio           | 确定组件是否应保留其比例                                                                                        | boolean       | false                                            |
| w                     | 定义组件的初始宽度,该值可以是 >= 0 的数字或字符串“auto” ,如果设置为“auto”，则初始宽度值将等于组件内内容的宽度   | number,string | 200                                              |
| h                     | 定义组件的初始高度,该值可以是 >= 0 的数字或字符串“auto” ,如果设置为“auto”，则初始宽度值将等于组件内内容的高度   | number,string | 200                                              |
| minw                  | 最小宽度                                                                                                        | number        | 50                                               |
| minh                  | 最小高度                                                                                                        | nubmer        | 50                                               |
| x                     | 组件初始 x 位置                                                                                                 | number        | 0                                                |
| y                     | 组件初始 y 位置                                                                                                 | number        | 0                                                |
| z                     | 组件的 zindex 层级                                                                                              | number,string | 'auto'                                           |
| stickSize             | 棍棒尺寸                                                                                                        | number        | 8                                                |
| sticks                | 定义句柄数组以限制元素大小调整                                                                                  | sting[]       | ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'] |
| axis                  | 定义元素可拖动的轴。 可用值为 x，y，both 或 none                                                                | string        | both                                             |
| dragHandle            | 用于拖动组件的选择器                                                                                            | string        | ''                                               |
| dragCancel            | 用于防止拖动初始化的选择器                                                                                      | string        | ''                                               |
| contentClass          | 定义一个类，应用于带有 vdr 类的 div                                                                             | string        | ''                                               |

#### 函数方法

| 参数名      | 描述                                             |
| ----------- | ------------------------------------------------ |
| clicked     | 单击组件时调用                                   |
| activated   | 单击组件时调用，以显示句柄                       |
| deactivated | 当用户单击组件外部的任何位置时调用，以便将其停用 |
| resizing    | 组件调整大小时调用                               |
| resizestop  | 组件停止调整大小时调用                           |
| dragging    | 组件被拖动时调用                                 |
| dragstop    | 组件停止被拖动时调用                             |
