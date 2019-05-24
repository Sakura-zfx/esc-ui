import { isMobile, isIOS, online, isDef, cookieGet } from '@@/utils'

import { DotOptions, Dot as EscDot } from 'types/dot'

const defaultOptions: DotOptions = {
  moduleId: undefined,
  eventId: undefined,
  orgId: cookieGet('orgId'),
  userId: cookieGet('userId'),
  platform: isMobile ? isIOS ? 'iOS' : 'android' : undefined,
  base: `${online ? 'https://admin.jituancaiyun.com' : 'http://admin.jituancaiyun.net'}/dot-log/logExt.json`
}

export default class Dot implements EscDot {
  options: DotOptions = {}

  constructor (options?: DotOptions) {
    if (options && typeof options !== 'object') {
      throw new Error('Dot constructor options is a object.')
    } else if (!isDef(options)) {
      options = {}
    }
    this.options = {
      ...defaultOptions,
      ...options
    }
  }

  getUrl (didArr: string[] | void): string {
    let { platform, moduleId, eventId, userId, orgId, base } = this.options
    if (didArr) {
      const [ ,, mid, eid ] = didArr
      moduleId = mid || moduleId
      eventId = eid || eventId
    }
    return `${base}?platform=${platform}&mid=${moduleId}&eid=${eventId}&uid=${userId || 1}${orgId ? `&orgId=${orgId}` : ''}`
  }

  /**
   * @params did {String} 打点字符 形如 '0.0.4405.1'
  */
  hit (did?: string) {
    let didArr: string[] | void
    if (did) {
      didArr = did.split('.').slice(0, 4)
      if (didArr.length < 4) {
        didArr = new Array(4 - didArr.length).fill('').concat(didArr)
      }
    }
    const url = this.getUrl(didArr)
    let img: HTMLImageElement | null = new Image()
    img.src = url
    img.onload = img.onerror = () => {
      img = null
    }
  }
}

const dot = new Dot()
export const hit = (did: string) => {
  if (!isDef(did)) {
    throw new Error('did is a string, such as "0.0.4405.1"')
  }
  dot.hit(did)
}
