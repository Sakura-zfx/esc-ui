import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
import { loading } from './loading'
import { EscHttpOptions, EscHttpResponse, Notify, NotifyObject, StringMap, UniversalMap } from 'types/http'

const defaultOptions: EscHttpOptions = {
  urlMap: {},
  baseUrl: '',
  timeout: 20000,
  contentType: 'application/x-www-form-urlencoded',
  arrayFormat: 'repeat',
  useQsStringifyBody: true,
  withCredentials: true,
  notify: console.log,
  defaultErrorNotifyMessage: '服务异常，请稍后再试',
  loadingMethods: {
    open: () => console.log('open loading'),
    close: () => console.log('close loading')
  },
  // @ts-ignore
  successRequestAssert (serverResponse) {
    return serverResponse.success
  },
  captureAssert (serverResponse) {
    // @ts-ignore
    return serverResponse.code > 300
  }
}

export default class Base {
  options: EscHttpOptions

  constructor (options: EscHttpOptions) {
    if (!options || typeof options !== 'object') {
      throw new Error('EscHttpOptions is unvalid')
    }
    this.options = {
      ...defaultOptions,
      ...options
    }
  }

  mergeConfig (
    isBodyData: boolean,
    data?: UniversalMap,
    config?: AxiosRequestConfig
  ): AxiosRequestConfig | undefined {
    let mergeConfig: AxiosRequestConfig | undefined
    if (config && typeof config === 'object') {
      mergeConfig = { ...config }
    }
    if (data && typeof data === 'object') {
      if (!mergeConfig) {
        mergeConfig = {}
      }
      if (isBodyData) {
        mergeConfig.data = {
          ...(mergeConfig.data || {}),
          ...data
        }
      } else {
        mergeConfig.params = {
          ...(mergeConfig.params || {}),
          ...data
        }
      }
    }
    return mergeConfig
  }

  getPath (urlName: string): string {
    const { urlMap } = this.options
    const pathArr: Array<string> = urlName.split('/')
    let i = 0
    let path = urlMap[pathArr[i]]
    // path 多级嵌套
    while (typeof path === 'object' && i < 10) {
      i++
      path = path[pathArr[i]]
    }
    if (i >= 10) {
      throw new Error(`${urlName} is not found in urlMap!`)
    }
    // if (pathArr.length === 2 && typeof urlMap[pathArr[0]] === 'object') {
    //   path = (<StringMap> urlMap[pathArr[0]])[pathArr[1]]
    // }
    if (typeof path === 'string') {
      return path
    }
    throw new Error(`${urlName} 在 urlMap 里没有找到！`)
  }

  dealPathParams (path: string, data?: UniversalMap) {
    const matches = path.match(/(:[\w\d-_]+)/g)
    if (matches) {
      const dataRes = data || {}
      matches.forEach(mat => {
        const key = mat.substr(1)
        // 必须以字母开头
        if (/^[a-z]/.test(key)) {
          path = path.replace(mat, dataRes[key])
          delete dataRes[key]
        }
      })
    }
    return path
  }

  notify (
    res: EscHttpResponse,
    attaches?: UniversalMap,
    isSuccess?: boolean
  ) {
    let { notify, defaultErrorNotifyMessage } = this.options
    if (notify instanceof Function) {
      notify = {
        success: notify,
        error: notify
      }
    }

    const hasNotify = !attaches || (attaches && attaches.notify !== false)
    const codeCallback = attaches && attaches.codeCallback
    const successMessage = attaches && attaches.successMessage
    const _notify = (msg: string, cb?: Notify) => {
      hasNotify && cb && cb(msg)
    }

    const { msg, code } = res
    if (isSuccess) {
      successMessage && _notify(successMessage, (notify as NotifyObject).success)
    } else if (codeCallback && code && codeCallback[code]) {
      codeCallback[code](res, msg)
    } else {
      _notify(msg || (defaultErrorNotifyMessage as string), (notify as NotifyObject).error)
    }
  }

  commonThen<T> (
    res: AxiosResponse,
    attaches?: UniversalMap
  ): EscHttpResponse | Promise<EscHttpResponse> {
    let result = res.data

    // 适配 jsonp
    if (attaches && attaches.jsonp) {
      try {
        // eslint-disable-next-line no-eval
        eval(result)
      } catch (e) {
        return Promise.reject(e)
      }
      loading.pop(attaches)
      // @ts-ignore
      return
    }

    const { beforeThen, successRequestAssert } = this.options
    if (beforeThen && typeof beforeThen === 'function') {
      result = beforeThen(result, attaches)
    }
    // loading
    loading.pop(attaches)
    const fileContentType = /application\/vnd\.ms-excel|multipart\/form-data/
    const headerResponse = (res.headers && res.headers['content-type']) || 'application/json'
    const isResponseTypeAccept = /json|html|text/.test(headerResponse)
    if (
      !isResponseTypeAccept && (
        fileContentType.test(res.headers['content-type']) ||
        (attaches && attaches.maybeFile)
      )
    ) {
      // 返回结果本身
      return result
    }
    if (!result || typeof result !== 'object') {
      // throw new Error('beforeThen 返回的结果不合法')
      return Promise.reject(res)
    }

    const finalResponse = {
      ...result,
      attaches
    }
    if (
      successRequestAssert &&
      typeof successRequestAssert === 'function' &&
      successRequestAssert(result)
    ) {
      this.notify(finalResponse, attaches, true)
      return finalResponse
    }
    return Promise.reject(finalResponse)
  }

  commonCatch (
    error: EscHttpResponse | AxiosError,
    attaches?: UniversalMap
  ): Promise<EscHttpResponse> {
    if (axios.isCancel(error)) {
      console.log('Request canceled')
      loading.pop(attaches)
      return Promise.reject(error)
    }

    let finalError: EscHttpResponse
    const isResponseReject = (<EscHttpResponse> error).success !== undefined
    // @ts-ignore
    finalError = isResponseReject ? error : {
      attaches,
      error,
      msg: (error as AxiosError).message,
      success: false,
      code: (error as AxiosError).code
    }

    const { beforeCatch, captureAssert } = this.options
    if (beforeCatch && typeof beforeCatch === 'function') {
      finalError = beforeCatch(finalError, attaches)
    }
    if (!finalError || (finalError && typeof finalError !== 'object')) {
      throw new Error('beforeCatch 返回的结果不合法')
    }
    // loading
    loading.pop(attaches)
    // notify
    this.notify(finalError, attaches)
    if (isResponseReject) {
      if (captureAssert && captureAssert(finalError)) {
        this.capture(JSON.stringify(finalError))
      }
      return Promise.reject(finalError)
    }

    this.capture(finalError)
    return Promise.reject(finalError)
  }

  capture (obj: string | EscHttpResponse) {
    if (this.options.bindSentry) {
      this.options.bindSentry.captureException(
        obj instanceof Error
          ? obj
          : new Error(typeof obj === 'string' ? obj : JSON.stringify(obj))
      )
    }
  }
}
