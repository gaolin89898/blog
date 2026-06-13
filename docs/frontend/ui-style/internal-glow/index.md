---
description: 内发光卡片样式，使用渐变边框与模糊制造光晕效果
---

# 内发光样式

## DOME

<div class="internal-card">
  <span>我是一张散发内在光芒的卡片</span> 
</div>

<script>
 import './index.css'
</script>

```html
<div class="internal-card">
  <span>我是一张散发内在光芒的卡片</span>
</div>
```

```css
@property --a {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
.internal-card {
  overflow: hidden;
  position: relative;
  width: 400px;
  /* 设定纵横比为 1:1（正方形），如果内容不决定高度，则使用该值 */
  aspect-ratio: 1;
  /* 让卡片的四个角变圆 */
  border-radius: 20px;
  /* 下面的样式主要用于美化文本和布局 */
  place-self: center;
  place-content: center;
  padding: 0.5em;
  color: #ededed;
  font: clamp(1em, 2vw + 2vh, 2em) sans-serif;
  text-align: center;
  text-transform: uppercase;
  text-wrap: balance;
}
.internal-card::before {
  /* 绝对定位，让其覆盖整个卡片 */
  position: absolute;
  /* 确保它在 `.card` 的文本后面，而不是覆盖文本 */
  z-index: -1;
  /* 让边框向外扩展 1em（确保边框不会紧贴卡片边缘） */
  inset: -1em;
  /* 设置边框，宽度为 1.25em */
  border: solid 1.25em;
  /* 使用渐变色作为边框，并让它呈现光晕效果 */
  border-image: conic-gradient(
      from var(--a),
      #669900,
      #99cc33,
      #ccee66,
      #006699,
      #3399cc,
      #990066,
      #cc3399,
      #ff6600,
      #ff9900,
      #ffcc00,
      #669900
    ) 1;
  /* 应用模糊效果，使边框产生发光感 */
  filter: blur(0.75em);
  /* 添加无限循环动画，使边框颜色旋转 */
  animation: a 4s linear infinite;
  /* 让 `::before` 伪元素可见 */
  content: "";
}

/* animate --a from its initial-value 0deg to 1turn */
@keyframes a {
  to {
    --a: 1turn;
  }
}
```
