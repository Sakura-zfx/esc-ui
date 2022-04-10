import Vue from 'vue'
import VueDialog from './dialog'
import { isVNode } from '../utils'
// Types
import { EscDialog, DialogOptions } from 'types/dialog'

let instance: Vue & DialogOptions & { show?: boolean, close(): void }

const DialogDefaultOptions = {
  title: '提示',
  message: '',
  show: true,
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  showConfirmButton: true,
  showCancelButton: false,
  beforeClose: undefined,
  isLayerTransparent: false,
  pointEventsNone: false,
  container: 'body'
}

const isOptions = (opt: any) => typeof opt === 'object' && (opt.title !== undefined || opt.message !== undefined)

const DialogClass: EscDialog = options => new Promise((resolve, reject) => {
  const multiTypeOptions = (isOptions(options) ? options : { message: options }) as DialogOptions
  if (!instance) {
    const DialogConstructor = Vue.extend(VueDialog)
    instance = new DialogConstructor({
      el: document.createElement('div')
    })
    instance.$on('input', (value: boolean): void => {
      instance.show = value
    })
  }

  if (isVNode(multiTypeOptions.message)) {
    // @ts-ignore
    instance.$slots.default = [multiTypeOptions.message]
    multiTypeOptions.message = ''
  }

  Object.assign(instance, DialogDefaultOptions, multiTypeOptions, {
    resolve,
    reject
  })
})

DialogClass.alert = DialogClass
DialogClass.confirm = options => {
  const multiTypeOptions = (isOptions(options) ? options : { message: options }) as DialogOptions
  multiTypeOptions.showCancelButton = true
  return DialogClass(multiTypeOptions)
}
DialogClass.close = () => {
  instance && instance.close()
}
DialogClass.install = () => {
  Vue.prototype.$escDialog = DialogClass
}

export default DialogClass
