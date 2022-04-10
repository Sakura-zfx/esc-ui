# Dialog

常见的弹窗分为2种，一种是通用型提示用弹窗；一种是内容承载型弹窗；前者一般通过全局 api 调用使用，后者通过组件的形式引入使用。

> 通用型提示弹窗建议使用 [Popup](#/popup) 做二次封装为业务组件使用

引入

```js
import { Dialog } from 'esc-ui'
```

代码演示

```js
Vue.use(Dialog)
// 无标题
this.$escDialog({ title: '', message: '我是内容' })

// 默认带标题
this.$escDialog.confirm('我是内容')

// 内容加粗
this.$escDialog({ title: '我是内容', message: '' })

// 传入 VNode
this.$escDialog(this.$createElement('span', undefined, '我是VNode'))

// 异步关闭
this.$escDialog.confirm({
  title: '标题',
  message: '我是内容',
  beforeClose(action, done) {
    setTimeout(() => {
      done()
    }, 2000)
  }
})
```

### API

参数|类型|默认值|说明
----|----|-----|----
title|`string`|'提示'|标题
message|`string` `VNode`|-|内容
confirmButtonText|`string`|'确 定'|确定按钮文案
cancelButtonText|`string`|'取 消'|取消按钮文案
showConfirmButton|`boolean`|`true`|是否显示确定按钮
showCancelButton|`boolean`|`false`|是否显示取消按钮
isLayerTransparent|`boolean`|`false`|遮罩背景是否透明
beforeClose|`function`|-|关闭前的回调，接受2个参数 `action` 和 `done`，其中done为完成回调
