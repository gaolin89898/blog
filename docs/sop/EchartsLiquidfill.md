---
sticky: 1
---

# echarts-liquidfill（液体填充图）

ECharts 中的 Liquidfill（液体填充图）是一种图表类型，用于直观地显示填充量与总量之间的比例关系。Liquidfill 图表通常用于展示百分比数据，通过液体的填充高度来表示数据的比例。你可以通过 ECharts 的 API 来创建和配置 Liquidfill 图表，以展示你的数据。

[Github:https://github.com/ecomfe/echarts-liquidfill](https://github.com/ecomfe/echarts-liquidfill)

## 安装

### 通过 NPM

```sh
$ npm install echarts
$ npm install echarts-liquidfill
```

### 通过 CDN 使用

```html
<script src="echarts.js"></script>
<script src="echarts-liquidfill.js"></script>
```

## 引入

```js
import * as echarts from "echarts";
import "echarts-liquidfill";
```

### DOME

## API

### 基本参数

| 参数名                  | 描述                                                                                                              | 类型                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------- |
| type                    | chart 类型                                                                                                        | string               |
| data                    | 数据                                                                                                              | (number,Object)[]    |
| color                   | 颜色                                                                                                              | string[]             |
| center                  | 图表的位置。第一个值是 x 位置，第二个值是 y 位置。每个值可以是相对于容器宽度和高度的较小值的相对值,也可以是绝对值 | string[]             |
| radius                  | 图表的半径，可以是相对于容器宽度和高度的较小值的相对值 '50%' ，也可以是绝对值 100px                               | string               |
| amplitude               | 波的振幅，以像素或百分比为单位。如果以百分比为单位，则与直径有关。                                                | number               |
| waveLength              | 波的波长，可以是相对于直径的相对值 '50%' ，也可以是绝对值                                                         | string,number        |
| phase                   | 波的相位，在弧度系统中。默认情况下，当每个波的相位 Math.PI / 4 大于前一个波时，它设置为 'auto'                    | number,auto          |
| period                  | 向前移动波长所需的毫秒。默认情况下，当前面的波具有更大的速度时，它设置为 'auto'                                   | number,auto,function |
| direction               | 波浪移动的方向，应为 'right' 或 'left'                                                                            | string               |
| waveAnimation           | 是否启用向左或向右移动的波                                                                                        | boolean              |
| animationEasing         | 初始动画的缓和方法，当波浪在开始时从底部升起时                                                                    | string               |
| animationEasingUpdate   | 其他动画的缓和方法，例如，当数据值更改和波形位置更改时                                                            | string               |
| animationDuration       | 初始动画持续时间，以毫秒为单位                                                                                    | number               |
| animationDurationUpdate | 其他动画的缓和方法，例如，当数据值更改和波形位置更改时                                                            | number               |
| outline                 | 边框配置                                                                                                          | outline              |
| backgroundStyle         | 背景配置                                                                                                          | backgroundStyle      |
| itemStyle               | 波浪配置                                                                                                          | itemStyle            |
| emphasis                | 悬停配置                                                                                                          | emphasis             |
| label                   | 文本配置                                                                                                          | label                |

### outline

| 参数名                        | 描述                 | 类型    |
| ----------------------------- | -------------------- | ------- |
| outline.show                  | 是否显示轮廓         | boolean |
| outline.borderDistance        | 边框和内圈之间的距离 | number  |
| outline.itemStyle.borderColor | 边框颜色             | string  |
| outline.itemStyle.borderWidth | 边框宽度             | number  |
| outline.itemStyle.shadowBlur  | 轮廓阴影模糊大小     | number  |
| outline.itemStyle.shadowColor | 勾勒阴影颜色         | string  |

### backgroundStyle

| 参数名                                | 描述             | 类型   |
| ------------------------------------- | ---------------- | ------ |
| backgroundStyle.color                 | 背景填充颜色     | string |
| backgroundStyle.borderWidth           | 背景描边线宽     | number |
| backgroundStyle.borderColor           | 背景描边颜色     | number |
| backgroundStyle.itemStyle.shadowBlur  | 背景阴影模糊大小 | number |
| backgroundStyle.itemStyle.shadowColor | 背景阴影颜色     | string |
| backgroundStyle.itemStyle.opacity     | 背景不透明度     | number |

### itemStyle

| 参数名                | 描述         | 类型   |
| --------------------- | ------------ | ------ |
| itemStyle.opacity     | 波浪不透明度 | number |
| itemStyle.shadowBlur  | 波影宽度     | number |
| itemStyle.shadowColor | 波浪阴影颜色 | string |

### emphasis

| 参数名                     | 描述               | 类型   |
| -------------------------- | ------------------ | ------ |
| emphasis.itemStyle.opacity | 悬停时波浪不透明度 | number |

### label

| 参数名            | 描述                                                                                                                           | 类型            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| label.color       | 是否显示标签文本                                                                                                               | boolean         |
| label.insideColor | 在背景上显示时的文本颜色                                                                                                       | string          |
| label.fontSize    | 在波浪上显示时的文本颜色                                                                                                       | string          |
| label.fontWeight  | 标签字体大小                                                                                                                   | number          |
| label.align       | 文本对齐，应为 'left' 、 'center' 或 'right'                                                                                   | string          |
| label.baseline    | 文本垂直对齐，应为 'top' 、 'middle' 或 'bottom'                                                                               | string          |
| label.position    | 默认情况下，文本位置位于中心。 label.position 可以设置为 'inside' 、 'left' 、 'right' 、 'top' 、 'bottom' ，或水平和垂直位置 | string,string[] |
