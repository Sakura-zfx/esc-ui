export namespace utils {
  export function use (name: string, app?: string): Array<any>
  export function useBem (name: string, app?: string): Array<any>
  export function isVNode (node: any): boolean
  export function isDef<T> (val: T): boolean
  export function vw (px: number): string
  export function cookieGet (name: string): string | null
  export const isMobile: boolean
  export const isIOS: boolean
  export const online: boolean
}
