# Loading

Loading 加载提示同样也支持2种使用方式：全局 api 调用和组件注入。

使用

```js
import { Loading } from 'esc-ui'

// 注入全局组件 esc-loading
// 并且挂载到原型 Vue.prototype.$loading = Loading.instance
Vue.use(Loading)

// 手动注册组件
Vue.component('my-loading', Loading.component)

// 手动挂载
Vue.prototype.$escLoading = Loading.instance
```

代码演示

```html
<template>
  <!--组件调用-->
  <esc-loading v-model="showLoading" color="white" />
</template>

<script>
export default {
  created() {
    Vue.use(Loading)
    // api 调用
    this.$escLoading.open()
    this.$escLoading.close()
  }
}  
</script>
```

### API

参数|类型|默认值|说明
----|----|-----|----
color|string|black|可选值`white`
