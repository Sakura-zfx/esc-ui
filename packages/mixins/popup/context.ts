import { LayerStackItem } from './decalare'

interface Context {
  index: number
  stack: LayerStackItem[]
  top: LayerStackItem
}

const context: Context = {
  index: 2000,
  stack: [],
  get top (): LayerStackItem {
    return this.stack[this.stack.length - 1]
  }
}

export default context
