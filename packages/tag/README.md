## Tag

```js
import { Tag } from 'esc-ui'
```

例子一：默认大小

````html
<template>
  <div>
    <tag>已取消</tag>
    <tag type="success">已完成</tag>
    <tag type="danger">赠品</tag>
    <tag type="info">进行中</tag>
  </div>
</template>
````

例子二：加大尺寸

````html
<template>
  <div>
    <tag size="large" type="success">已完成</tag>
  </div>
</template>
````

例子三：自定义颜色

````html
<template>
  <div>
    <tag :color="['#333', '#fff']">纯甄极品</tag>
  </div>
</template>
````

