// eslint-disable-next-line
import axios from 'axios'

// Types
import {
  EscHttp,
  EscHttpOptions,
  UniversalMap,
  EscHttpResponse,
  EscHttpError,
  LoadingObject,
  Attaches,
  StringMap
} from 'types/http'
// eslint-disable-next-line
import { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios'

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
  loadingMethods: {
    open: () => console.log('open loading'),
    close: () => console.log('close loading')
  },
  successRequestAssert (serverResponse) {
    return serverResponse.success
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
      mergeConfig.params = {
        ...(mergeConfig.params || {}),
        ...data
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

    let mergeConfig = this.mergeConfig(data, config)
    if (beforeRequest && typeof beforeRequest === 'function') {
      mergeConfig = beforeRequest(mergeConfig, attaches)
    }
    loading.add(loadingMethods, attaches)
    // @ts-ignore 除了 get 和 post，也可以使用 put 或 delete，此处缺少索引
    return (<AxiosInstance> this.instance)[method](path, mergeConfig)
  }

  private commonThen (
    res: AxiosResponse,
    attaches?: UniversalMap
  ): EscHttpResponse | Promise<EscHttpResponse> {
    const { beforeThen, successRequestAssert } = this.options
    if (beforeThen && typeof beforeThen === 'function') {
      res = beforeThen(res, attaches)
    }
    // loading
    loading.pop(attaches)

    if (!res || (res && typeof res !== 'object')) {
      throw new Error('beforeThen 返回的结果不合法')
    }

    if (
      successRequestAssert &&
      typeof successRequestAssert === 'function' &&
      successRequestAssert(res.data)
    ) {
      return {
        ...res,
        attaches
      }
    }
    // eslint-disable-next-line
    return Promise.reject({
      ...res,
      attaches
    })
  }

  private commonCatch (
    error: EscHttpResponse | EscHttpError,
    attaches?: UniversalMap
  ): EscHttpError | Promise<EscHttpError> {
    let finalError: EscHttpError
    const isResponseReject = (<EscHttpResponse> error).status && (<EscHttpResponse> error).headers
    // @ts-ignore
    finalError = isResponseReject ? {
      config: error.config,
      // code: (<EscHttpResponse> error).status,
      request: error.request,
      response: (<EscHttpResponse> error),
      attaches
    } : {
      ...error,
      attaches
    }

    const { beforeCatch } = this.options
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
      return Promise.reject(finalError)
    }
    if (axios.isCancel(error)) {
      console.log('Request canceled', (error as EscHttpError).message)
    }
    return Promise.reject(finalError)
  }

  private notify (finalError: EscHttpError, attaches?: UniversalMap) {
    // let responseMessage
    const { notify } = this.options
    const hasNotify = attaches && attaches.notify !== false
    const codeCallback = attaches && attaches.codeCallback

    if (finalError.response && finalError.response.data) {
      const { msg, code } = finalError.response.data
      // responseMessage = msg
      if (codeCallback && codeCallback[code]) {
        // const { message, handle } = codeCallback[code]
        codeCallback[code](finalError, msg)
      } else if (notify && hasNotify) {
        notify(msg)
      }
    } else if (notify && hasNotify) {
      notify(finalError.message || '服务异常')
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
      .catch((error: EscHttpResponse | EscHttpError) => this.commonCatch(error, attaches))
  }

  post (
    urlName: string,
    data?: UniversalMap,
    attaches?: Attaches,
    config?: AxiosRequestConfig
  ) {
    return this.handle('post', urlName, data, attaches, config)
      .then((res: AxiosResponse) => this.commonThen(res, attaches))
      .catch((error: EscHttpResponse | EscHttpError) => this.commonCatch(error, attaches))
  }
}
