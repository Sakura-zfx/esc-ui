## Http

引入

```js
import { Http } from 'esc-ui'
```

基础演示

```js
Vue.prototype.$http = new Http(options: EscHttpOptions)

this.$http.get(
  uriName: string, 
  data?: any, 
  attaches?: { [key: string]: any },
  config?: AxiosRequestConfig
)
.then((res: EscHttpResponse) => {})
.catch((error: EscHttpError) => {})

// 实例
this.$http.get(
  'getList', 
  { siteId: 1 }, 
  { loading: false, notify: false }, 
  { params: { siteType: 2 } }
)
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
this.$http.get('order/list')
this.$http.get('cart/list')
this.$http.get('list')
```

> 仅支持 get 和 post

### attaches

可选的指定字段

属性名|类型|默认值|说明
---|-----|----|----
loading|`boolean`|`true`| 是否打开loading
notify|`boolean`|`true`| 是否打开提示
codeCallback|`{ [code: string]: (error: EscHttpError, message) => any }`|-|接口指定的某种code下的特定行为

### EscHttpOptions

属性名|类型|默认值|说明
---|-----|----|----
baseUrl|`string`|-|axios baseURL
urlMap|`{ [name: string]: string }`|-|必传的接口map，例如：`{ getList: '/purchase/cart/list' }`
timeout|`number`|20000|-
notify|`(message: string) => void`|`console.log`|类似 toast 的提示函数
loadingMethods|`LoadingObject`|`{ open: console.log, close: console.log }`|请求loading的开关函数对象
contentType|`ContentType`|`application/x-www-form-urlencoded`|request 文本类型
arrayFormat|`ArrayFormat`|`repeat`|可选 `repeat` `indices` `brackets` `comma`
headers|`{ [name: string]: string }`|-|-
useQsStringifyBody|`boolean`|`true`|使用 qs stringify post body
bindSentry|`EscSentry`|-|将 sentry 绑定使用，会捕获 http 非 200 的错误
withCredentials|`boolean`|`true`|-
successRequestAssert|`(serverResponse: any) => boolean`|`res => res.success`|如何认为接口返回了正常结果 
beforeRequest|`(data?: AxiosRequestConfig, attaches?: UniversalMap) => AxiosRequestConfig`|-|-
beforeThen|`(res: AxiosResponse, attaches?: UniversalMap) => AxiosResponse`|-|-
beforeCatch|`(res: EscHttpError, attaches?: UniversalMap) => EscHttpError`|-|-

> 其中 UniversalMap 为 { [key: string]: any }

### EscHttpError

属性名|类型|默认值|说明
---|-----|----|----
config|`AxiosRequestConfig`|-|
response|`EscHttpResponse`|-|
attaches|`attaches`|-|

> EscHttpResponse 为 axios 的 response，接口返回的字段是 response.data
