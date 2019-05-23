import { EscSentry } from './sentry'
import { AxiosResponse, AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'

export interface StringMap {
  [name: string]: string
}
export type LoadingObject = {
  open: () => void
  close: () => void
}
export type UniversalMap = {
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
  urlMap: StringMap
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
  get: (urlName: string, data?: any, config?: AxiosRequestConfig, attaches?: any) => Promise<EscHttpResponse | EscHttpError>
}

export interface EscHttpResponse extends AxiosResponse {
  attaches?: UniversalMap
}

export interface EscHttpError extends AxiosError {
  attaches?: UniversalMap
}
