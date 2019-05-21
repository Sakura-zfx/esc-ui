import bem from './bem'
import { VNode } from 'vue/types'

export function use (name: string) {
  return [
    bem(name)
  ]
}

export function isVNode (node: VNode | string | void): boolean {
  return node !== null &&
    typeof node === 'object' &&
    Object.prototype.hasOwnProperty.call(node, 'componentOptions')
}

export function isDef<T> (val: T): boolean {
  return val !== undefined && val !== null
}

export function formatNumber (val: number, fixed: number): string {
  const pow = Math.pow(10, fixed)
  return (Math.round(pow * val) / pow).toFixed(fixed)
}

export const isMobile = /Mobile/i.test(navigator.userAgent)

export const isIOS = /iPhone/i.test(navigator.userAgent)

export const online = /\.com/.test(location.origin)

export const cookieGet = (name: string): string => {
  let cookieValue = ''
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}
