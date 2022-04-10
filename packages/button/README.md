# Button

引入

```js
import { Button } from 'esc-ui'

Vue.use(Button)
```

代码演示
```html
<template>
  <esc-button url="https://google.com">
    普通按钮
  </esc-button>

  <esc-button
    color="red"
    square
    plain
    @click="handleClick"
  >
    定制色值
  </esc-button>

  <esc-button
    type="primary"
    disabled
    @click="handleClick"
  >
    禁用按钮
  </esc-button>

  <esc-button
    type="primary"
    loading-text="加载按钮"
    loading
    @click="handleClick"
  >
    确定
  </esc-button>

  <esc-button
    loading
    color="red"
    @click="handleClick"
  />
</template>
```

### API

参数|类型|默认值|说明
----|----|-----|----
type|`string`|`default`|可选值 `primary`
size|`string`|`normal`|可选值 `large` `small` `mini`
text|`string`| - | `deprecated`
round|`boolean`|`false`|是否为全圆角按钮，默认的圆角尺寸为2px
square|`boolean`|`false`|是否为方形按钮
block|`boolean`|`false`|是否为块级按钮
plain|`boolean`|`false`|是否为镂空按钮
disabled|`boolean`|`false`|是否禁用
loading|`boolean`|`false`|是否处于加载状态
loading-text|`string`|-|加载提示文案
url|`string`|-|点击跳转的url，为路由 path `'/login'` 或正常的`http(s)`链接
replace|`boolean`|`false`|跳转是否采用replace
radius|`number`|-|自定义圆角大小，不建议使用
color|`string`|-|自定义色值，例如：`red` `#ff4400`，不建议使用
