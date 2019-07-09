## TabNav

导航菜单组件

引入

```js
import { TabNav } from 'esc-ui'

Vue.use(TabNav)
```

代码演示

```html
<template>
<tab-nav 
  v-model="active"
  :items="[ { name: '首页' }, { name: '购物车' }, { name: '个人中心' } ]"
  :border="true"
/>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>
```

### Tab Props

名称|类型|默认值|说明
----|----|----|---
v-model|number|-|已选中索引
items| TabItem[]|-|导航类目
selectedColor| string|`'red'`|选中色
  color| string|`'#5c626b'`|未选中色
  fixed| boolean|-|是否固定在底部
  border| boolean|-|是否有上边框
  route| boolean|-|是否是路由模式
  replace| boolean|-|路由跳转用replace

### TabItem

名称|类型|默认值|说明
----|----|----|---
icon | string|-|未选中的icon，支持img和iconfont
  iconSelected| string|-|同上
  name| string|-|名称
  info| string|-|角标
  to| string|-|跳转的地址，http链接或路由path
