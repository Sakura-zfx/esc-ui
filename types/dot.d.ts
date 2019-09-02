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

export interface Dot {
  options: DotOptions
  getUrl (didArr: string[] | void): string
  hit (did?: string): void
}

export interface DotInstance extends Dot {
  new (options: DotOptions): Dot
}

declare module 'vue/types/vue' {
  interface Vue {
    $dot: Dot
  }
}

export const EscDot: DotInstance
