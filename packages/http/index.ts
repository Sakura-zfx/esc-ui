// eslint-disable-next-line
import axios from 'axios'

// Types
import {
  EscHttp,
  EscHttpOptions,
  UniversalMap,
  EscHttpResponse,
  LoadingObject,
  Attaches,
  StringMap,
  Notify,
  NotifyObject
} from 'types/http'
// eslint-disable-next-line
import { AxiosResponse, AxiosInstance, AxiosRequestConfig, CancelTokenSource, AxiosError } from 'axios'

interface LoadingStack {
  stack: Array<LoadingObject>
  add(obj?: LoadingObject, attaches?: UniversalMap): void,
  pop(attaches?: UniversalMap): void
}

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

const loading: LoadingStack = {
  stack: [],
  add (obj, attaches) {
    if (attaches && attaches.loading === false) {
      return
    }
    if (obj && typeof obj.open === 'function' && typeof obj.close === 'function') {
      if (this.stack.length === 0) {
        obj.open()
      }
      this.stack.push(obj)
    }
  },
  pop (attaches) {
    if (attaches && attaches.loading === false) {
      return
    }
    const last = this.stack.pop()
    if (this.stack.length === 0 && last) {
      (<LoadingObject> last).close()
    }
  }
}

type CancelList = {
  list: {
    [key: string]: (msg?: string) => void
  }
  add: (name: string, source: CancelTokenSource) => void
  cancel: (name: string, msg?: string) => void
  cancelAll(message?: string): void
}
const cancelQueen: CancelList = {
  list: {},
  add (name, source) {
    this.list[name] = msg => {
      source.cancel(msg)
    }
  },
  cancel (name, msg) {
    if (this.list[name]) {
      this.list[name](msg)
    }
  },
  cancelAll (message) {
    Object.keys(this.list).forEach((key: string) => {
      this.list[key](message)
    })
  }
}

export default class Http implements EscHttp {
  instance?: AxiosInstance
  options: EscHttpOptions

  constructor (options: EscHttpOptions) {
    if (!options || typeof options !== 'object') {
      throw new Error('EscHttpOptions is unvalid')
    }
    this.options = {
      ...defaultOptions,
      ...options
    }
    this.init()
  }

  private init () {
    const { timeout, baseUrl, contentType, headers, withCredentials } = this.options
    this.instance = axios.create({
      baseURL: baseUrl,
      timeout,
      withCredentials,
      headers: {
        'Content-Type': contentType,
        ...(headers || {})
      }
    })
  }

  private mergeConfig (
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

  private handle (
    method: string,
    urlName: string,
    data?: UniversalMap,
    attaches?: UniversalMap,
    config?: AxiosRequestConfig
  ) {
    const { beforeRequest, urlMap, loadingMethods } = this.options
    const pathArr: Array<string> = urlName.split('/')
    let path = urlMap[urlName]
    if (pathArr.length === 2 && typeof urlMap[pathArr[0]] === 'object') {
      path = (<StringMap> urlMap[pathArr[0]])[pathArr[1]]
    }

    const isBodyData = method === 'post'
    let mergeConfig = this.mergeConfig(isBodyData, data, config)
    if (beforeRequest && typeof beforeRequest === 'function') {
      const reqData = mergeConfig ? isBodyData ? mergeConfig.data : mergeConfig.params : undefined
      const reqResult = beforeRequest(reqData, mergeConfig, attaches)
      // 将 { data, config } 中的data合并到config
      if (reqResult && reqResult.config) {
        isBodyData
          ? reqResult.config.data = { ...(reqResult.config.data || {}), ...(reqResult.data || {}) }
          : reqResult.config.params = { ...(reqResult.config.params || {}), ...(reqResult.data || {}) }
        mergeConfig = reqResult.config
      }
    }
    // add cancel token
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    if (!mergeConfig) {
      mergeConfig = {}
    }
    mergeConfig.cancelToken = source.token
    cancelQueen.add(urlName, source)

    loading.add(loadingMethods, attaches)
    // @ts-ignore 除了 get 和 post，也可以使用 put 或 delete，此处缺少索引
    return (<AxiosInstance> this.instance)[method](
      path,
      // get(url[, config])
      // post(url, data[, config])
      isBodyData ? mergeConfig.data : mergeConfig,
      isBodyData ? mergeConfig : undefined
    )
  }

  private commonThen<T> (
    res: AxiosResponse,
    attaches?: UniversalMap
  ): EscHttpResponse | Promise<EscHttpResponse> {
    let result = res.data
    const { beforeThen, successRequestAssert } = this.options
    if (beforeThen && typeof beforeThen === 'function') {
      result = beforeThen(result, attaches)
    }
    // loading
    loading.pop(attaches)

    if (!result || (result && typeof result !== 'object')) {
      throw new Error('beforeThen 返回的结果不合法')
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

  private commonCatch (
    error: EscHttpResponse | AxiosError,
    attaches?: UniversalMap
  ): Promise<EscHttpResponse> {
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
    if (axios.isCancel(error)) {
      console.log('Request canceled')
    }
    this.capture(finalError)
    return Promise.reject(finalError)
  }

  private capture (obj: string | EscHttpResponse) {
    if (this.options.bindSentry) {
      this.options.bindSentry.captureException(
        obj instanceof Error
          ? obj
          : new Error(typeof obj === 'string' ? obj : JSON.stringify(obj))
      )
    }
  }

  private notify (
    res: EscHttpResponse,
    attaches?: UniversalMap,
    isSuccess?: boolean
  ) {
    let { notify, defaultErrorNotifyMessage } = this.options
    if (notify instanceof Function) {
      notify = {
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

  get (
    urlName: string,
    data?: UniversalMap,
    attaches?: Attaches,
    config?: AxiosRequestConfig
  ) {
    return this.handle('get', urlName, data, attaches, config)
      .then((res: AxiosResponse) => this.commonThen(res, attaches))
      .catch((error: EscHttpResponse | AxiosError) => this.commonCatch(error, attaches))
  }

  post (
    urlName: string,
    data?: UniversalMap,
    attaches?: Attaches,
    config?: AxiosRequestConfig
  ) {
    return this.handle('post', urlName, data, attaches, config)
      .then((res: AxiosResponse) => this.commonThen(res, attaches))
      .catch((error: EscHttpResponse | AxiosError) => this.commonCatch(error, attaches))
  }

  cancel (all?: boolean, name?: string, message?: string) {
    if (all) {
      cancelQueen.cancelAll(message)
    } else if (name) {
      cancelQueen.cancel(name, message)
    }
  }
}
