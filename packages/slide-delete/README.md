## SlideDelete

左滑删除容器

引入

```js
import { SlideDelete } from 'esc-ui'
```

代码演示

```html
<template>
  <slide-delete
    del-text="删除商品"
    @open="open"
    @del="del"
  >
    <div class="demo-item">delete item</div>
    <div slot="del">删除icon可编辑</div>
  </slide-delete>
</template>

<script>
export default {
  components: {
    SlideDelete
  },
  methods: {
    open(vm) {
    },
    del() {
    }
  }
}
</script>
```

### Props

名称|类型|默认值|说明
----|----|-----|----
delCls|`string`|`m-slide__del-red`|删除按钮自定义样式名
delText|`string`|`删除`|删除按钮文本

### Slots

名称|说明
---|----
`default`|默认插槽
`del`|删除位插槽

### Events

名称|类型|说明
---|----|----
`open`|`(vm: VNode) => void`|当滑动打开后触发
`del`|`() => void`|点击删除触发

### Methods

通过 ref 获取调用

名称|类型|说明
---|----|----
`setOpen`|`(type: boolean) => void`|是否打开当前组件
