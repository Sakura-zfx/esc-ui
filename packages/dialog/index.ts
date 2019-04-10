import Vue from 'vue'
import VueDialog from './Dialog.vue'
import { isVNode } from '@@/utils'
// Types
import { DialogOptions, DialogType, DialogAction } from './declare'

let instance: DialogType & DialogOptions

const DialogDefaultOptions = {
  title: '提示',
  message: '',
  show: true,
  confirmButtonText: '确 定',
  cancelButtonText: '取 消',
  showConfirmButton: true,
  showCancelButton: false,
  beforeClose: undefined,
  isLayerTransparent: false
}

const Dialog = (options: string | DialogOptions): Promise<DialogAction> => new Promise((resolve, reject) => {
  const multiTypeOptions = typeof options === 'string' ? { message: options } : options
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
    // todo 如何解决
    // @ts-ignore
    instance.$slots.default = [multiTypeOptions.message]
    multiTypeOptions.message = ''
  }

  Object.assign(instance, DialogDefaultOptions, multiTypeOptions, {
    resolve,
    reject
  })
})

Dialog.alert = Dialog
Dialog.confirm = (options: string | DialogOptions): Promise<DialogAction> => Dialog(options)
Vue.prototype.$dialog = Dialog

export default Dialog

