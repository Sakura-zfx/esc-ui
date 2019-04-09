# Dialog

常见的弹窗分为2种，一种是通用型提示用弹窗；一种是内容承载型弹窗；前者一般通过全局 api 调用使用，后者通过组件的形式引入使用。

> 当前只实现了通用型提示用弹窗

引入

```js
import { Dialog } from 'esc-ui'
```

代码演示

```js
// 传入字符串
this.$dialog.alert('我是内容')

// 带标题
this.$dialog.confirm({
  title: '标题',
  message: '我是内容'
})

// 传入 VNode
this.$dialog.alert(this.$createElement('p', undefined, '我是VNode'))
```
