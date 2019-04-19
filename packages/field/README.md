# Field

表单输入包含 3 类：
- 单行输入
  - 纯文本
  - 数字（包含精确度）
- 多行输入
- 数字加减器

> TODO 验证码输入框

引入

```js
import { Field } from 'esc-ui'
Vue.use(Field)
```

代码演示

```html
<template>
  <esc-field
    v-model="val"
    label="购买数量"
    :fixed="1"
    is-input-number
  />
  <esc-field
    label="姓名"
    v-model="name"
  />
</template>
```

### API
参数|类型|默认值|说明
----|----|-----|----
value|`string`|-|v-model绑定的属性
type | `string` | `input` | 输入类型，可选 `textarea`
label|`string`|-|自定义输入框标签
labelClass|`string`|-|自定义输入框标签类
fixed|`number`|-|数字输入的精确度，可选 `0` `1` `2`
max|`number`|`Number.MAX_SAFE_INTEGER`|最大的数字
min|`number`|`0`|最小的数字
autoHeight|`boolean`|-|多行输入时，高度自增
minHeight|`number`|80|多行输入时，最小高度
maxHeight|`number`|-|多行输入时，自增的最大高度
inputAlign|`string`|`left`|输入框和文本对齐方式，可选 `right`
placeholder|`string`|请输入|
isInputNumber|`boolean`|-|是否为数字加减器
readonly|`boolean`|-|是否只读

### Event
事件	|说明|	回调参数
----|----|----
input|v-model绑定的事件|

### Slot
名称	|说明
---|----
label|自定义输入框标签
