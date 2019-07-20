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
    :is-full="true"
    background="#fff"
    @btnClick="btnClick"
  />
</template>
```

### Props

名称|类型|默认值|说明
---|----|---|----
title|`String`|-|主文案
desc|`String`|-|辅助文案
buttonText|`String`|-|按钮文案
background|`String`|-|背景颜色
isFull|`Boolean`|`false`|是否全屏

### Events

名称|类型|说明
---|----|---
btnClick|`Function`|按钮点击事件
