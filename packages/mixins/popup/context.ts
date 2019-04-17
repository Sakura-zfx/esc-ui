import { LayerStackItem } from './decalare'

export default {
  index: 2000,
  stack: [],
  get top (): LayerStackItem {
    return this.stack[this.stack.length - 1]
  }
}
