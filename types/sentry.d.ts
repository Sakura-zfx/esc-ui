export interface EscSentryOption {
  dsn?: string
  open?: boolean
  release?: undefined | string,
  preventRejection?: boolean
}

export interface EscSentry {
  options: EscSentryOption
  sentryInstance: any
  init (): void
  captureException (err: Error): void
  captureMessage (msg: string, level?: string): void
}

export interface EscSentryInstance extends EscSentry {
  new (options?: EscSentryOption): EscSentry
}

declare module 'vue/types/vue' {
  interface Vue {
    $sentry: EscSentry
  }
}

export const Sentry: EscSentryInstance
