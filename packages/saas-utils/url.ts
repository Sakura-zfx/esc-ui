import { OrderType, OrderTypeText, BizType, BizName } from 'types/saas-utils'
import { isWx } from './bool'

export function toOrderList (
  type: OrderType | OrderTypeText,
  siteId: number | string,
  isRouter?: boolean,
  isReplace?: boolean
) {
  if (typeof type !== 'number') {
    throw new Error('type 需要传 number 类型，OrderTypeText 只做提示用！')
  }
  let url = getUrl((orderTypeAppMap[(type as OrderType)] as BizName), siteId)
  if (type === 1) {
    url += '#/h5'
  } else {
    url += '#/common'
  }
  url += `#/order-list/${type === 1 ? 0 : type}`
  redirect(url, isRouter, isReplace)
}

export function getBase (isLocal: boolean, origin?: string): string {
  const base = origin || (isLocal ? 'http://youli.uban360.net' : location.origin)
  if (isWx) {
    return `${base}/youli/daily`
  }
  return base
}

const orderTypeAppMap = {
  1: 'malls',
  2: 'dd',
  3: 'fj',
  4: 'hc',
  5: 'jd',
  6: 'mt'
}
const bizTypeMap = {
  22: 'malls',
  139: 'malls',
  175: 'malls',
  132: 'mt',
  3: 'dd'
}
type AppPath = {
  malls: string
  mt: string
  dd: string
  [name: string]: string
}
const appPathMap: AppPath = {
  malls: '/h5/index.html',
  mt: '/common/index.html',
  dd: '/didi/index.html'
}

export function getUrl (appType: BizType | BizName, siteId: number | string, base?: string) {
  const bizName = typeof appType === 'string' ? appType : bizTypeMap[appType]
  return `${base || getBase(false)}${appPathMap[bizName]}?siteId=${siteId}`
}

export function toOrderDetail (
  appType: BizType | BizName,
  orderId: string,
  siteId: number | string,
  isRouter?: boolean,
  isReplace?: boolean
) {
  let url = `#/order-detail/${orderId}`
  const bizName = typeof appType === 'string' ? appType : bizTypeMap[appType]
  if (bizName === 'dd') {
    url = `#/process/${orderId}/200`
  }
  redirect(getUrl(appType, siteId) + url, isRouter, isReplace)
}

function redirect (url: string, isRouter?: boolean, isReplace?: boolean) {
  if (isRouter) {
    // @ts-ignore
    this.$router[isReplace ? 'replace' : 'push'](url.split('#')[1])
  } else {
    isReplace ? location.replace(url) : (location.href = url)
  }
}
