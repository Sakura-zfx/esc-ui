import { VNode } from 'vue/types'

type DialogAction = 'confirm' | 'cancel'

export interface DialogBeforeClose {
  (action: DialogAction, done: DialogDone): void
}

export interface DialogDone {
  (close?: boolean): void
}

export interface DialogOptions {
  title?: string,
  message?: string | VNode,
  container?: string,
  beforeClose?: (action: DialogAction, done: DialogDone) => void
}

export interface DialogType {
  // todo resolve() / reject() 回掉的类型
  [index: string]: any,
  (options: DialogOptions): Promise<DialogAction>,
  alert(options: DialogOptions): Promise<DialogAction>,
  confirm(options: DialogOptions): Promise<DialogAction>
}

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: DialogType
  }
}
