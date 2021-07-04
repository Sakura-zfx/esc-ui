## ContentCard

图文两栏或三栏卡片展示

引入

```js
import { Contentcard } from 'esc-ui'
```

代码演示

```html
<template>
  <content-card
    img-src="https://i.loli.net/2019/07/11/5d26fdb64d85633722.jpg"
    :size="[70, 80]"
    :vertical-center="false"
    :custom-class="['aa']"
  >
    <template #centerTop>
      <span>虚拟网6送6</span>
    </template>
    <template #centerBottom>
      <span>到期时间：2018/01/03</span>
    </template>
    <template #right>
      <esc-button
        text="立即订购"
        size="small"
        type="primary"
      />
    </template>
  </content-card>
</template>
```

### Props

名称|类型|默认值|说明
---|----|---|----
imgSrc|`string`|-|左边图片
  size| `Array<number>`|`[]`|尺寸，`[左，右，中]`，可选：`为 0 时，表示该项不显示，大于0时，表示该项的宽度，为undefined时，表示宽度自适应`
  padding| `number`|`10`|内边距
  verticalCenter| `boolean`|-|是否垂直居中
  customClass| `Array<string>`|`[]`|三项的自定义class，顺序为`[左，右，中]`


### Slots

名称|说明
---|----
left|左边图片坑位
center|中间坑位
centerTop|中间上部分
centerBottom|中间下部分
right|右坑位


