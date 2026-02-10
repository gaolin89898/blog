---
description: 通过 CSS mask 反转边框半径，实现图片内凹角效果
---

# 使用 CSS mask 反转边框半径

## dome

<div class="mask-container">
<img src="https://picsum.photos/id/1018/300/300" class="bottom-right">
<img src="https://picsum.photos/id/128/300/300" class="bottom-left">
<img src="https://picsum.photos/id/139/300/300" class="top-right">
<img src="https://picsum.photos/id/1022/300/300" class="top-left">
</div>

<script>
  import './index.css'
</script>

```html
<div class="mask-container">
  <img src="https://picsum.photos/id/1018/300/300" class="bottom-right" />
  <img src="https://picsum.photos/id/128/300/300" class="bottom-left" />
  <img src="https://picsum.photos/id/139/300/300" class="top-right" />
  <img src="https://picsum.photos/id/1022/300/300" class="top-left" />
</div>
```

```css
.mask-container {
  margin: 0;
  height: 500px;
  display: grid;
  grid-template-columns: auto auto;
  place-content: center;
  gap: 20px;
  img {
    --r: 20px; /* 角的半径 */
    --s: 40px; /* 内凹曲线的大小 */
    --x: 25px; /* 水平偏移量（用来调整凹陷位置） */
    --y: 5px; /* 垂直偏移量（用来调整凹陷位置） */

    width: 200px;
    border-radius: var(--r);
  }
  .top-right {
    --_m: /calc(2 * var(--r)) calc(2 * var(--r)) radial-gradient(#000 70%, #0000
          72%);
    --_g: conic-gradient(at calc(100% - var(--r)) var(--r), #0000 25%, #000 0);
    --_d: (var(--s) + var(--r));
    mask: calc(100% - var(--_d) - var(--x)) 0 var(--_m), 100% calc(
          var(--_d) + var(--y)
        ) var(--_m),
      radial-gradient(var(--s) at 100% 0, #0000 99%, #000 calc(100% + 1px)) calc(
          -1 * var(--r) - var(--x)
        )
        calc(var(--r) + var(--y)), var(--_g) calc(-1 * var(--_d) - var(--x)) 0,
      var(--_g) 0 calc(var(--_d) + var(--y));
    mask-repeat: no-repeat;
  }
  .top-left {
    --_m: /calc(2 * var(--r)) calc(2 * var(--r)) radial-gradient(#000 70%, #0000
          72%);
    --_g: conic-gradient(at var(--r) var(--r), #000 75%, #0000 0);
    --_d: (var(--s) + var(--r));
    mask: calc(var(--_d) + var(--x)) 0 var(--_m), 0 calc(var(--_d) + var(--y)) var(
          --_m
        ),
      radial-gradient(var(--s) at 0 0, #0000 99%, #000 calc(100% + 1px)) calc(
          var(--r) + var(--x)
        )
        calc(var(--r) + var(--y)), var(--_g) calc(var(--_d) + var(--x)) 0,
      var(--_g) 0 calc(var(--_d) + var(--y));
    mask-repeat: no-repeat;
  }
  .bottom-left {
    --_m: /calc(2 * var(--r)) calc(2 * var(--r)) radial-gradient(#000 70%, #0000
          72%);
    --_g: conic-gradient(
      from 180deg at var(--r) calc(100% - var(--r)),
      #0000 25%,
      #000 0
    );
    --_d: (var(--s) + var(--r));
    mask: calc(var(--_d) + var(--x)) 100% var(--_m), 0 calc(
          100% - var(--_d) - var(--y)
        ) var(--_m),
      radial-gradient(var(--s) at 0 100%, #0000 99%, #000 calc(100% + 1px)) calc(
          var(--r) + var(--x)
        )
        calc(-1 * var(--r) - var(--y)), var(--_g) calc(var(--_d) + var(--x)) 0,
      var(--_g) 0 calc(-1 * var(--_d) - var(--y));
    mask-repeat: no-repeat;
  }
  .bottom-right {
    --_m: /calc(2 * var(--r)) calc(2 * var(--r)) radial-gradient(#000 70%, #0000
          72%);
    --_g: conic-gradient(
      from 90deg at calc(100% - var(--r)) calc(100% - var(--r)),
      #0000 25%,
      #000 0
    );
    --_d: (var(--s) + var(--r));
    mask: calc(100% - var(--_d) - var(--x)) 100% var(--_m), 100% calc(
          100% - var(--_d) - var(--y)
        ) var(--_m),
      radial-gradient(var(--s) at 100% 100%, #0000 99%, #000 calc(100% + 1px)) calc(
          -1 * var(--r) - var(--x)
        )
        calc(-1 * var(--r) - var(--y)), var(--_g) calc(
          -1 * var(--_d) - var(--x)
        )
        0, var(--_g) 0 calc(-1 * var(--_d) - var(--y));
    mask-repeat: no-repeat;
  }
}
```
