import bem from './bem'
// import { isDef } from './util'

import { VNode } from 'vue/types'

export function isVNode (node: VNode | string | void): boolean {
  return node !== null &&
    typeof node === 'object' &&
    Object.prototype.hasOwnProperty.call(node, 'componentOptions')
}

export function use (name: string) {
  return [
    bem(name)
  ]
}

export function isDef<T> (val: T): boolean {
  return val !== undefined && val !== null
}

export function formatNumber (val: number, fixed: number): string {
  const pow = Math.pow(10, fixed)
  return (Math.round(pow * val) / pow).toFixed(fixed)
}
