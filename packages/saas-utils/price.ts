import { PricePlayArg } from 'types/saas-utils'

// 单位都是分
const defaultRate = 100
const defaultRateName = '积分'
// 积分转钱
export const integralTo = (integral = 0, rate = defaultRate) => integral / (rate / 100)

// 钱转积分
// rmb 单位是分
export const toIntegral = (rmb = 0, rate = defaultRate) => {
  let fixed = 0
  if (rate < 10) {
    fixed = 2
  } else if (rate < 100) {
    fixed = 1
  }
  return (rmb / 100 * rate).toFixed(fixed)
}
export const toIntegralText = (
  rmb: number,
  rate: number,
  name: string = defaultRateName
) => `${toIntegral(rmb, rate)}${name}`

export const formatPrice = (rmb: number) => `¥${(rmb / 100).toFixed(2)}`

export const pricePlay = (
  rmb: number,
  { showPriceWay, integralName, integralRate }: PricePlayArg
) => {
  return showPriceWay === 2
    ? formatPrice(rmb)
    : toIntegralText(rmb, integralRate, integralName)
}

export const pricePlayTag = (
  rmb: number,
  { showPriceWay, integralName, integralRate }: PricePlayArg
) => {
  if (showPriceWay === 2) {
    const str = formatPrice(rmb)
    return `<span class="price-flag">${str[0]}</span><span class="price-main">${str.substr(1)}</span>`
  }
  return `<span class="price-main">${toIntegral(rmb, integralRate)}</span><span class="price-flag">${integralName}</span>`
}
