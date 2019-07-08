export const Toast: (message: string) => void

declare module 'vue/types/vue' {
  interface Vue {
    $escToast: (message: string) => void
  }
}
