import { OrderType, OrderTypeText, BizType, BizName } from 'types/saas-utils'
import { isWx } from './bool'

type AppPath = {
  malls: string
  mt: string
  dd: string
  [name: string]: string
}

// const orderTypeAppMap: { [name: string]: number } = {
//   malls: 1,
//   dd: 2,
//   fj: 3,
//   hc: 4,
//   jd: 5,
//   mt: 6
// }
const bizTypeMap = {
  22: 'malls',
  139: 'malls',
  175: 'malls',
  132: 'mt',
  3: 'dd'
}
const appPathMap: AppPath = {
  malls: '/h5/index.html',
  mt: '/common/index.html',
  dd: '/didi/index.html'
}

export function getBase (isLocal: boolean, origin?: string): string {
  const base = origin || (isLocal ? 'http://youli.uban360.net' : location.origin)
  if (isWx && /developer/.test(location.hostname)) {
    return `${base}/youli/daily`
  }
  return base
}

export function getUrl (appType: BizType | BizName, siteId: number | string, base?: string) {
  const bizName = typeof appType === 'string' ? appType : bizTypeMap[appType]
  return `${base || getBase(false)}${appPathMap[bizName]}?siteId=${siteId}`
}

export function toOrderList (
  type: OrderType | OrderTypeText,
  siteId: number | string,
  isRouter?: boolean,
  isReplace?: boolean
) {
  if (typeof type === 'string') {
    throw new Error('type 需要传 number 类型，OrderTypeText 只做提示用！')
  }
  let url = getUrl('malls', siteId)
  if (type !== 1) {
    url = url.replace('/h5', '/common')
  }
  url += `#/order-list/${type === 1 ? 0 : type}`
  redirect(url, isRouter, isReplace)
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
