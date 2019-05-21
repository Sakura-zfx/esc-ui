## EscSentry

Vue 版本错误捕获工具，原理是封装 sentry 的 `@sentry/browser^5.2.1` 和 `@sentry/integrations^5.2.0`。

引入

```js
import EscSentry from 'esc-ui/lib/utils/sentry' 
```

代码演示

```js
// 使用构造函数
Vue.prototype.$sentry = new EscSentry(options?: EscOptions)
```

⚠️ 注意：初始化后，就会全局捕获错误，默认情况下，promise 的 reject 错误是被屏蔽掉的。对于 http 非 200 的异常，需要手动捕获。如果想要屏蔽全局的 error ，可以使用：
```js
window.addEventListener('error', (msg, url, row, col, error) => {
  // do something
})
```

> 可通过 vm.$sentry.sentryInstance 获取 Sentry 实例

### EscOptions

属性名|类型|默认值|说明
---|-----|----|----
dsn|`string`|`@sentry.io/212146`|sentry 注册的项目标识，默认是企业服务
open|`boolean`|`true`|是否打开收集，默认情况下，测试环境不开启
release|`string`|-|标记错误版本，例如 saas 2.1 期
preventRejection|`boolean`|`true`|是否阻止全局 unhandlerejection 错误 

### API
方法名|参数|描述
---|---|----
captureException|`(err: Error)`|捕获错误
captureMessage|`(msg: string, level?: string)`|捕获文本，错误的优先级可选，`error` `debug` `info` `warning`

