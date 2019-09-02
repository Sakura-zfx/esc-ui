## EscDot

通用打点函数

组件引入

```js
import { Dot } from 'esc-ui'
```

CDN 引入
```html
<script src="https://statics.e.uban360.com/js/esc-ui/dot.js"></script>  
```

代码演示
```js
// 1. 通过组件引入
// 通过构造函数
Vue.prototype.$dot = new EscDot(options: DotOptions)

// 如果初始化时，传递了 moduleId，则 hit 时只用传 eventId
Vue.prototype.$dot.hit('1')
// 否则需要传2段
Vue.prototype.$dot.hit('4405.1')

// 2. 通过 CDN
// dot 为实例
const dot = new window.EscDot.default(options: DotOptions)
// 或
const hit = window.EscDot.hit
```

### DotOptions
属性名|类型|默认值|说明
---|-----|----|----
globalId|`string | number`|-|通用id
moduleId|`string | number`|-|模块id
eventId|`string | number`|-|打点id
orgId|`string | number`|-|企业id
userId|`string | number`|-|用户id
platform|`string`|-|平台统计，默认：移动端 `iOS` `Android`，pc `undefined`
base|`string`|`${domain}/dot-log/logExt.json`|打点的接口地址，默认到彩云

### API
方法名|参数|描述
---|---|---
hit|`did: string`|打点字符串，形如`0.0.4405.1`

提示：4位打点字符串含义代表 `gid.bizType.mid.eid` 对应options `globalId.bizType.moduleId.eventId`
