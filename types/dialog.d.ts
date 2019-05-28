import { VNode } from 'vue/types'

export type DialogAction = 'confirm' | 'cancel'

export interface DialogBeforeClose {
  (action: DialogAction, done: (close?: boolean) => void): void
}

export interface DialogOptions {
  title?: string,
  message?: string | VNode,
  container?: string,
  beforeClose?: DialogBeforeClose,
  confirmButtonText?: string,
  cancelButtonText?: string,
  showConfirmButton?: boolean,
  showCancelButton?: boolean,
  isLayerTransparent?: boolean
}

export interface EscDialog {
  (options: string | DialogOptions): Promise<DialogAction>
  alert(options: string | DialogOptions): Promise<DialogAction>
  confirm(options: string | DialogOptions): Promise<DialogAction>
  close(): void
  install(): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: EscDialog
  }
}

// export const Dialog: Dialog
