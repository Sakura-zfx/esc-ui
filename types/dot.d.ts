export interface DotOptions {
  globalId?: string | number,
  moduleId?: string | number
  eventId?: string | number
  orgId?: string | number
  userId?: string | number
  platform?: 'iOS' | 'android',
  base?: string
  // bizType?: number
}

export interface EscDot {
  options: DotOptions
  getUrl (didArr: string[] | void): string
  hit (did?: string): void
}

export interface DotInstance extends EscDot {
  new (options: DotOptions): EscDot
}

declare module 'vue/types/vue' {
  interface Vue {
    $dot: EscDot
  }
}

export const Dot: DotInstance
