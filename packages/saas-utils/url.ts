import { OrderType, OrderTypeText } from 'types/saas-utils'

export function toOrderList (
  type: OrderType | OrderTypeText,
  siteId: number | string,
  isRouter?: boolean,
  isReplace?: boolean
) {
  if (typeof type !== 'number') {
    throw new Error('type 需要传 number 类型，OrderTypeText 只做提示用！')
  }
  let url = location.origin
  if (type === 1) {
    url += '/h5'
  } else {
    url += '/common'
  }
  url += `/index.html?siteId=${siteId}#/order-list/${type === 1 ? 0 : type}`

  if (isRouter) {
    // @ts-ignore
    this.$router[isReplace ? 'replace' : 'push'](url)
  } else {
    location[isReplace ? 'replace' : 'href'] = url
  }
}
