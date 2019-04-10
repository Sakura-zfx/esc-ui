import Vue, { VNode } from 'vue/types'

export type DialogAction = 'confirm' | 'cancel'

export interface DialogBeforeClose {
  (action: DialogAction, done: DialogDone): void
}

export interface DialogDone {
  (close?: boolean): void
}

export interface DialogOptions {
  title?: string,
  show?: boolean,
  message?: string | VNode,
  container?: string,
  beforeClose?: undefined | DialogBeforeClose
}

export interface DialogType extends Vue {
  // todo resolve() / reject() 回调的类型如何写？
  // [index: string]: (options: DialogOptions) => Promise<DialogAction>,
  // resolve(): void,
  // reject(): void,
  (options: DialogOptions): Promise<DialogAction>,
  // pit 类实例方法的声明方式，与静态方法的声明不同
  // https://juejin.im/post/5bc406795188255c451ed3b3
  alert(options: DialogOptions): Promise<DialogAction>,
  confirm(options: DialogOptions): Promise<DialogAction>
}
