import { VNode } from 'vue/types'

export function isVNode(node: VNode | string | undefined): boolean {
  return node !== null &&
    typeof node === 'object' &&
    Object.prototype.hasOwnProperty.call(node, 'componentOptions')
}
