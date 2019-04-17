# Popup

弹出层是基于 `mixins/popup` 衍生扩展出来的一个容器，相对于 [Dialog](#/dialog)、[Loading](#/loading) 简单许多，因为他是组件式的。

引用

```js
import { Popup } from 'esc-ui'
```

代码演示

```html
<template>
  <esc-popup
    ref="popup"
    v-model="show"
    :position="position"
    close-on-click-layer
  >
    <esc-button
      text="嵌套弹层"
      @on-click="$dialog.alert('我是嵌套弹层的弹窗alert')"
    />
    <esc-button
      text="手动关闭"
      @on-click="$refs.popup.close()"
    />
  </esc-popup>
</template>
```

### API

参数|类型|默认值|说明
----|----|-----|----
position|`string`|`center`| 弹层方位
closeOnClickLayer|`boolean`|`false`| 是否点击蒙层遮罩关闭
isLayerTransparent|`boolean`|`false`|蒙层遮罩是否透明

### Event
参数|类型|默认值|说明
----|----|-----|----
openSelfAndLayer|`function`|-|手动打开弹层
close|`function`|-|手动关闭弹层

