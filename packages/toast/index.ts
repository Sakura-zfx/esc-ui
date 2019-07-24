import Vue from 'vue'
import Toast from './toast'

interface Instance extends Vue {
  show: boolean
  message: string,
  isLayerTransparent?: boolean
  pointEventsNone?: boolean
  close: () => void
}

const ToastConstructor = Vue.extend(Toast())
let instance: Instance
const getInstance = () => {
  if (!instance) {
    instance = new ToastConstructor({
      el: document.createElement('div')
    })
    instance.$on('input', (value: boolean): void => {
      instance.show = value
    })
  }
}

const ToastFn = (message: string) => {
  let timer = null
  getInstance()
  if (timer) {
    clearTimeout(timer)
    instance.close()
  }

  instance.message = message
  instance.isLayerTransparent = true
  instance.pointEventsNone = true
  instance.show = true
  timer = setTimeout(() => {
    instance.close()
    timer = null
  }, 3000)
}

Vue.prototype.$escToast = ToastFn
// ToastFn.install = () => {
//   Vue.prototype.$escToast = ToastFn
// }

export default ToastFn
