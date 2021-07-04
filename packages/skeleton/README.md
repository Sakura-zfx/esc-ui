## Skeleton

代码引入

```js
import { Skeleton } from 'esc-ui'
```

代码演示

```html
<skeleton
  :rows="['100%', 10, 200]"
/>

<skeleton
  has-block
/>
```

### Props

参数|类型|默认值|说明
----|----|-----|----
strip|`boolean`|`true`|条形
block|`boolean`|`true`|块状
hasBlock|`boolean`|`true`|条形时，是否存在块状
rows|`Array<number | string>`|`['90%', '50%', '30%']`|条形定义
blockWidth|`number`|`60`|块状尺寸

