import { EscSentry } from './sentry'
import { AxiosResponse, AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'

export interface StringMap {
  [name: string]: string
}
export interface UrlMap {
  [name: string]: string | StringMap
}
export type LoadingObject = {
  open: () => void
  close: () => void
}
export type UniversalMap = {
  [key: string]: any
}
export type Attaches = {
  loading: boolean
  notify: boolean
  codeCallback: {
    [name: number]: (error: EscHttpError, msg: string) => any
  }
  [key: string]: any
}
export type ContentType = 'application/x-www-form-urlencoded' | 'application/json' | 'application/octet-stream'
export type ArrayFormat = 'repeat' | 'indices' | 'brackets' | 'comma'
// { a: ['b', 'c'] }
// 1. a=b&a=c  2. a[0]=b&a[1]=c  3. a[]=b&a[]=c   4. a=b,c
// export type Header = {
//   [name: string]: string
// }
// export type BodyDataStringifyType = 'qs'
// export type BeforeRequestReturn<T, U> = {
//   beforeData: T
//   beforeAttaches: U
// }

export interface EscHttpOptions {
  baseUrl?: string
  urlMap: UrlMap
  timeout?: number
  notify?: (message: string) => void
  loadingMethods?: LoadingObject
  contentType?: ContentType
  arrayFormat?: ArrayFormat
  headers?: StringMap
  // postDataStringifyType?: BodyDataStringifyType
  useQsStringifyBody?: boolean
  bindSentry?: EscSentry
  beforeRequest?: (data?: AxiosRequestConfig, attaches?: UniversalMap) => AxiosRequestConfig | undefined
  beforeThen?: (res: AxiosResponse, attaches?: UniversalMap) => AxiosResponse
  beforeCatch?: (res: EscHttpError, attaches?: UniversalMap) => EscHttpError
  withCredentials?: boolean,
  successRequestAssert?: (serverResponse: any) => boolean
}

export interface EscHttp {
  instance?: AxiosInstance
  options: EscHttpOptions
  get: (
    urlName: string,
    data?: any,
    attaches?: any,
    config?: AxiosRequestConfig
  ) => Promise<EscHttpResponse | EscHttpError>
  post: (
    urlName: string,
    data?: any,
    attaches?: any,
    config?: AxiosRequestConfig
  ) => Promise<EscHttpResponse | EscHttpError>
}

export interface EscHttpInstance extends EscHttp {
  new(options: EscHttpOptions): EscHttp
}

export interface EscHttpResponse extends AxiosResponse {
  attaches?: UniversalMap
}

export interface EscHttpError extends AxiosError {
  attaches?: UniversalMap
}

declare module 'vue/types/vue' {
  interface Vue {
    $http: EscHttp
    $http2: EscHttp
    $http3: EscHttp
  }
}

export const Http: EscHttpInstance
