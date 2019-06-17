# InfiniteScroll

分页加载组件，有些场景下列表滚动应该滚动的是 `documentElement` 元素，而不是某个固定高度的 `div`。

例如在微信中，只有在滚动`documentElement`时，底部的 tab，才会跟随显示与隐藏。同理，很多自然的交互也应该是这样。

当然，也支持在某个固定高度的 `div` 滚动。

### 引入

```js
import { InfiniteScroll } from 'esc-ui'
```

### 代码演示

```html
<template>
  <infinite-scroll
    class="demo-infinite"
    :load-fun="fetch"
    :top-hide-size="30"
  >
    <div
      class="demo-infinite-top"
      slot="top"
    >
      <div>菜单一</div>
      <div>菜单二</div>
    </div>
    <div
      class="demo-infinite-top__item"
      slot-scope="props"
    >
      {{ props }}
    </div>
  </infinite-scroll>
</template>
```

### API
参数|类型|默认值|说明
----|----|-----|----
windowScroll|`boolean`|`true`|是否为 window 滚动，而不是某个固定高度的 div
bottomThrottle|`number`|0|滚动到距离底部的阀值，开始拉取数据
loadFirst|`boolean`|`true`|首次是否自动加载
loadFun|`() => Promise<any[]>`|-|获取数据方法
topHideSize|`number`|-|头部区域在向上滑动时被隐藏多少，默认是 100%，当滚动为 window 时有效

### Methods
方法名|说明
----|----
load|手动触发获取数据函数

### Slots
插槽|说明
----|-----
default|默认是作用域插槽，接受每条数据作为参数: `slot-scope="props"`
top|当滚动为 window 时有效
empty|列表为空时
