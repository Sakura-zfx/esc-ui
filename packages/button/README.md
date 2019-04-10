# Button

引入

```js
import { Button } from 'esc-ui'

Vue.use(Button)
```

使用

```html
<template>
  <esc-button />
</template>
```

### API

参数|类型|默认值|说明
----|----|-----|----
type|`string`|`default`|可选值 `primary`
size|`string`|`normal`|可选值 `large` `small` `mini`
text|`string`| - | -
block|`boolean`|`false`|是否为块级按钮
plain|`boolean`|`false`|是否为镂空按钮
radius|`number`|`2`|圆角大小
disabled|`boolean`|`false`|是否禁用
loading|`boolean`|`false`|是否处于加载状态
loading-text|`string`|-|加载提示文案
url|`string`|-|点击跳转的url，为路由 path `'/login'` 或正常的`http(s)`链接
replace|`boolean`|`false`|跳转是否采用replace
