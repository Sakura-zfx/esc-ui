export interface EscSentryOption {
  dsn?: string
  open?: boolean
  release?: undefined | string,
  preventRejection?: boolean
}

export interface EscSentry {
  options: EscSentryOption
  sentryInstance: any
  // new (options?: EscSentryOption): void
  init (): void
  captureException (err: Error): void
  captureMessage (msg: string, level?: string): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $sentry: EscSentry
  }
}

export const EscSentry: EscSentry
