## Http

引入

```js
import { Http } from 'esc-ui'

// 小程序引入
import Http from 'esc-ui/lib/http/miniprogram'
```

基础演示

```js
http = new Http(options: EscHttpOptions)

http.get(
  uriName: string, 
  data?: any, 
  attaches?: { [key: string]: any },
  config?: AxiosRequestConfig
)
.then((res: EscHttpResponse) => {})
.catch((error: EscHttpResponse | AxiosError) => {})

// 实例
http.get(
  'getList', 
  { siteId: 1 }, 
  { 
    loading: false, 
    notify: false,
    codeCallback: {
      // 指定状态码对应的回调
      400: (err, msg) => {
        console.log(err, msg)
      }
    }
  }, 
  { params: { siteType: 2 } }
)
```

小程序请求示例

```js
import Http from 'esc-ui/lib/http/miniprogram'

const http = new Http({
  // ...
  miniprogramRequestHandle: (method, url, data, attaches) => wepy.wx.request(url, data, method),
})

http.get('test', {}, {})
```

初始化 urlMap 支持传递命名空间，例如

```js
// 定义
new Http({
  urlMap: {
    order: {
      list: '/path/order/list'
    },
    cart: {
      list: '/path/cart/list'
    },
    list: '/path/index/list' 
  }
})

// 使用
http.get('order/list')
http.get('cart/list')
http.get('list')

// 取消全部请求
http.cancel(true)

// 取消某个请求
http.cancel(false, 'order/list', 'cancel from me !')
```

> 仅支持 get 和 post

### attaches

可选的指定字段

属性名|类型|默认值|说明
---|-----|----|----
loading|`boolean`|`true`| 是否打开loading
notify|`boolean`|`true`| 是否打开提示
isReallyPath|`boolean`|`false`| path 直接使用，不通过 urlMap
successMessage|`string`|-|接口操作成功的提示文案
codeCallback|`{ [code: string]: (error: EscHttpResponse, message) => any }`|-|接口指定的某种code下的特定行为
isUpload|`boolean`|-|是否为上传文件
isMiniprogram|`boolean`|-|是否为小程序请求接口

### EscHttpOptions

属性名|类型|默认值|说明
---|-----|----|----
baseUrl|`string`|-|axios baseURL
urlMap|`{ [name: string]: string }`|-|必传的接口map，例如：`{ getList: '/purchase/cart/list' }`
timeout|`number`|20000|-
notify|`(message: string) => void`|`console.log`|类似 toast 的提示函数
loadingMethods|`LoadingObject`|`{ open: console.log, close: console.log }`|请求loading的开关函数对象
isMiniprogram|`boolean`|-|是否为小程序请求接口
contentType|`ContentType`|`application/x-www-form-urlencoded`|request 文本类型
arrayFormat|`ArrayFormat`|`repeat`|可选 `repeat` `indices` `brackets` `comma`
headers|`{ [name: string]: string }`|-|-
useQsStringifyBody|`boolean`|`true`|使用 qs stringify post body
bindSentry|`EscSentry`|-|将 sentry 绑定使用，会捕获 http 非 200 的错误
withCredentials|`boolean`|`true`|-
successRequestAssert|`(serverResponse: EscHttpResponse) => boolean`|`res => res.success`|如何认为接口返回了正常结果 
beforeRequest|`(data?: AxiosRequestConfig, attaches?: UniversalMap) => AxiosRequestConfig`|-|-
beforeThen|`(res: EscHttpResponse, attaches?: UniversalMap) => EscHttpResponse`|-|-
beforeCatch|`(res: EscHttpResponse, attaches?: UniversalMap) => EscHttpResponse`|-|-
captureAssert|`(serverResponse: EscHttpResponse) => boolean`|`res => res.code > 300`|当后端返回的 code > 300 时才捕获错误
defaultErrorNotifyMessage|`string`|'服务异常，请稍后再试'|默认的错误提示文案

> 其中 UniversalMap 为 { [key: string]: any }

### EscHttpResponse

属性名|类型|默认值|说明
---|-----|----|----
data|`any`|-|当前接口需要的字段
success|`boolean`|-|
attaches|`attaches`|-|
code|`number`|-|
msg|`string`|-|接口返回的msg或error.message
error|`AxiosError`|-|Error类型或axios返回的AxiosError

