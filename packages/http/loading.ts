import { LoadingObject, UniversalMap } from 'types/http'

interface LoadingStack {
  stack: Array<LoadingObject>
  add(obj?: LoadingObject, attaches?: UniversalMap): void,
  pop(attaches?: UniversalMap): void
}

export const loading: LoadingStack = {
  stack: [],
  add (obj, attaches) {
    if (attaches && attaches.loading === false) {
      return
    }
    if (obj && typeof obj.open === 'function' && typeof obj.close === 'function') {
      if (this.stack.length === 0) {
        obj.open()
      }
      this.stack.push(obj)
    }
  },
  pop (attaches) {
    if (attaches && attaches.loading === false) {
      return
    }
    const last = this.stack.pop()
    if (this.stack.length === 0 && last) {
      (<LoadingObject> last).close()
    }
  }
}
