import Vue, { Component } from 'vue/types'

export type LoadingColor = 'black' | 'white'
export type LoadingSize = 'default' | 'small'
export type LoadingType = Vue & Loading & { show: boolean }

export interface Loading {
  instance: LoadingType
  component: Component
  open(text?: string): void
  close(): void,
  install(): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $loading: Loading
  }
}

export const Loading: Loading
