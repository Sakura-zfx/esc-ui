export interface DotOptions {
  moduleId?: string
  eventId?: string
  orgId?: string
  userId?: string
  platform?: 'iOS' | 'android',
  base?: string
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
