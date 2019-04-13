import bem from './bem'
import { VNode } from 'vue/types'

export function isVNode(node: VNode | string | void): boolean {
  return node !== null &&
    typeof node === 'object' &&
    Object.prototype.hasOwnProperty.call(node, 'componentOptions')
}

export function use(name: string) {
  return [
    bem(name)
  ]
}
