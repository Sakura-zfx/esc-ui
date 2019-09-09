import { CancelTokenSource } from 'axios'

type CancelList = {
  list: {
    [key: string]: (msg?: string) => void
  }
  add: (name: string, source: CancelTokenSource) => void
  cancel: (name: string, msg?: string) => void
  cancelAll(message?: string): void
}
export const cancelQueen: CancelList = {
  list: {},
  add (name, source) {
    this.list[name] = msg => {
      source.cancel(msg)
    }
  },
  cancel (name, msg) {
    if (this.list[name]) {
      this.list[name](msg)
    }
  },
  cancelAll (message) {
    Object.keys(this.list).forEach((key: string) => {
      this.list[key](message)
    })
  }
}
