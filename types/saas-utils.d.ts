export type PricePlayArg = {
  showPriceWay: 1 | 2
  integralName?: string
  integralRate: number
}
export type OrderType = 1 | 2 | 3 | 4 | 5 | 6
export type OrderTypeText = '采购' | '用车' | '飞机' | '火车' | '酒店' | '餐饮'

export type BizType = 3 | 132 | 175 | 139
export type BizName = 'dd' | 'mt' | 'malls'

export namespace SaasUtils {
  export const defaultRate: number
  export const defaultRateName: string

  export function integralTo (integral: number, rate?: number): number
  export function toIntegral (rmb: number, rate?: number): number
  export function toIntegralText (rmb: number, rate: number, name: string): string
  export function formatPrice (rmb: number): string
  export function pricePlay (rmb: number, { showPriceWay, integralName, integralRate }: PricePlayArg): string
  export function pricePlayTag (rmb: number, { showPriceWay, integralName, integralRate }: PricePlayArg): string

  export function toOrderList(
    type: OrderType | OrderTypeText,
    siteId: number | string,
    isRouter?: boolean,
    isReplace?: boolean
  ): string
  export function toOrderDetail(
    appType: BizType | BizName,
    orderId: string,
    siteId: number | string
  ): string
  export function getUrl(
    appType: BizType | BizName,
    siteId: number | string,
    base?: string
  ): string
  export function getBase (isLocal: boolean, origin?: string): string
}
