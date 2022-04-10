# Photo

图片占位显示，包含商品图片、广告位等，用背景图实现，支持懒加载。

引入

```js
import { Photo } from 'esc-ui'
Vue.use(Photo)
```

代码演示

```html
<photo
  class="demo-photo"
  src=""
  cover
  :width="100"
  :height="() => 100"
/>

<photo
  class="demo-photo"
  is-lazy
  :pro-status="5"
  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRyCZSH1cbo-KDIYwL9nMffX2hxzeWZFB97ML50FpRfMNTjdO"
/>
```

### API

参数|类型|默认值|说明
----|----|-----|----
src|`string`|-|图片链接
cover|`boolean`|`false`|图片填充方式
defaultImgSrc|`string`|''|默认图
isLazy|`boolean`|`false`|依赖 `Vue-lazyload`
proStatus|`number | void` | `void` | 商品状态，可选值 `0 1 2 3 4 5`
width|`number`|-|-
height|`number | function` | - | 指定图片高度，或通过函数返回图片高度
vw|`boolean`|false|`width` 和 `height` 转化时是否为 `vw`，默认是 `px`  
