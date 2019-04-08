import Vue from 'vue'
import { VNode } from 'vue/types'
import VueDialog from './Dialog.vue'

interface DialogOptions {
  title?: string,
  container?: string,
  callback?: (action: string) => void
}

interface DialogVnode extends VNode {
  [index: string]: any,
  resolve(action: string): any,
  reject(action: string): any
}

let instance: DialogVnode
const DialogDefaultOptions = {
  title: '',
  showDialog: true,
  callback(action: string) {
    instance[action === 'confirm' ? 'resolve' : 'reject'](action)
  }
}

const Dialog = (options: DialogOptions) => new Promise((resolve, reject) => {
  if (!instance) {
    const DialogConstructor = Vue.extend(VueDialog)
    instance = new DialogConstructor({
      el: document.createElement('div')
    })
  }

  Object.assign(instance, DialogDefaultOptions, options, {
    resolve,
    reject
  })
})

Dialog.alert = Dialog

export default Dialog

