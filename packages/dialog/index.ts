import Vue from 'vue'
import VueDialog from './dialog'
import { isVNode } from '../utils'
// Types
import { Dialog, DialogOptions } from 'types/dialog'

let instance: Vue & DialogOptions & { show?: boolean, close(): void }

const DialogDefaultOptions = {
  title: '提示',
  message: '',
  show: true,
  confirmButtonText: '确 定',
  cancelButtonText: '取 消',
  showConfirmButton: true,
  showCancelButton: false,
  beforeClose: undefined,
  isLayerTransparent: false,
  container: 'body'
}

const DialogClass: Dialog = options => new Promise((resolve, reject) => {
  const multiTypeOptions = typeof options === 'string'
    ? { message: options }
    : options

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
DialogClass.confirm = options => DialogClass(options)
DialogClass.close = () => {
  instance.close()
}
DialogClass.install = () => {
  Vue.prototype.$dialog = DialogClass
}

export default DialogClass
