## Saas Utils

saas 业务通用工具函数

使用

```js
import { SaasUtils } from 'esc-ui'

const { pricePlay } = SaasUtils
```

### 价格类
> 钱的单位都是分

名称|类型|默认值|说明
---|-----|----|----
defaultRate|`number`|100|默认比率
defaultRateName|`string`|积分|默认名称
integralTo|`(integral: number, rate?: number): number`|-|积分转钱
toIntegral|`(rmb: number, rate?: number): number`|-|钱转积分
toIntegralText|`(rmb: number, rate: number, name: string): string`|-|钱转积分带名称
formatPrice|`(rmb: number): string`|-|格式化钱
pricePlay|`(rmb: number, { showPriceWay, integralName, integralRate }: PricePlayArg): string`|-|价格显示函数，纯文本
pricePlayTag|`(rmb: number, { showPriceWay, integralName, integralRate }: PricePlayArg): string`|-|价格显示函数，html标签，

> pricePlayTag 中，钱的 class 为 price-main，单位的 class 为 price-flag

### 链接类

名称|类型|默认值|说明
---|-----|----|----
toOrderList|`(type, siteId, isRouter?: boolean, isReplace?: boolean): string`|-|订单跳转

```js
export type OrderType = 1 | 2 | 3 | 4 | 5 | 6
export type OrderTypeText = '采购' | '用车' | '飞机' | '火车' | '酒店' | '餐饮'
```
