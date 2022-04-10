## Empty

空白部分展示

引入

```js
import { Empty } from 'esc-ui'
```

代码演示

```html
<template>
  <empty
    title="主文案最多九个字"
    desc="辅助文案不超过十四个字四个字"
    button-text="按钮点击"
    @btnClick="btnClick"
    button-color="#f40"
    picture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRyCZSH1cbo-KDIYwL9nMffX2hxzeWZFB97ML50FpRfMNTjdO"
  />
</template>
```

### Props

名称|类型|默认值|说明
---|----|---|----
picture|`string`|-|icon 图片
title|`string`|-|主文案
desc|`string`|-|辅助文案
buttonText|`string`|-|按钮文案
buttonColor|`string`|-|按钮颜色，默认蓝色
background|`string`|-|背景颜色
full|`boolean`|`false`|是否占满屏幕

### Events

名称|类型|说明
---|----|---
btnClick|`Function`|按钮点击事件
