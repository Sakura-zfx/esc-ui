// eslint-disable-next-line
import axios from 'axios'
import BaseHttp from './base'
// @ts-ignore
import qs from 'qs'

// Types
import {
  EscHttp,
  EscHttpOptions,
  UniversalMap,
  EscHttpResponse,
  Attaches
} from 'types/http'
// eslint-disable-next-line
import { AxiosResponse, AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import { cancelQueen } from './cancel'
import { loading } from './loading'

export default class Http extends BaseHttp implements EscHttp {
  instance?: AxiosInstance

  constructor (options: EscHttpOptions) {
    super(options)
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

  handle (
    method: string,
    urlName: string,
    data?: UniversalMap,
    attaches?: UniversalMap,
    config?: AxiosRequestConfig
  ) {
    const path = attaches && attaches.isReallyPath ? urlName : this.getPath(urlName)
    const isBodyData = method === 'post'
    let mergeConfig = this.mergeConfig(isBodyData, data, config)

    const { beforeRequest } = this.options
    if (beforeRequest && typeof beforeRequest === 'function') {
      const reqData = mergeConfig ? isBodyData ? mergeConfig.data : mergeConfig.params : undefined
      const reqResult = beforeRequest(reqData, mergeConfig, attaches)
      // 将 { data, config } 中的data合并到config
      if (reqResult) {
        const { data, config } = reqResult
        mergeConfig = config || mergeConfig || { params: {}, data: {} }
        if (isBodyData) {
          mergeConfig.data = { ...(mergeConfig.data || {}), ...(data || {}) }
        } else {
          mergeConfig.params = { ...(mergeConfig.params || {}), ...(data || {}) }
        }
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

    const { loadingMethods } = this.options
    loading.add(loadingMethods, attaches)

    // serializer
    const { arrayFormat, contentType } = this.options
    if (isBodyData && mergeConfig.data) {
      if (attaches && attaches.isUpload) {
        const form = new FormData()
        Object.keys(mergeConfig.data).forEach(key => {
          // @ts-ignore
          form.append(key, mergeConfig.data[key], mergeConfig.data[key].name)
        })
        mergeConfig.data = form
      } else {
        // 根据 conetnt-type 来判断 stringify
        const configContentType = (mergeConfig.headers &&
          (mergeConfig.headers['content-type'] || mergeConfig.headers['Content-Type'])) ||
          contentType
        mergeConfig.data = /urlencoded/.test(configContentType)
          ? qs.stringify(mergeConfig.data, { arrayFormat })
          : JSON.stringify(mergeConfig.data)
      }
    }

    // @ts-ignore 除了 get 和 post，也可以使用 put 或 delete，此处缺少索引
    return (<AxiosInstance> this.instance)[method](
      path,
      isBodyData ? mergeConfig.data : mergeConfig,
      // upload file 时，data必须为空，否则bug一堆
      isBodyData ? { ...mergeConfig, data: undefined } : undefined
    )
  }

  get (
    urlName: string,
    data?: UniversalMap,
    attaches?: Attaches,
    config?: AxiosRequestConfig
  ) {
    return this.handle('get', urlName, data, attaches, config)
      .then((res: AxiosResponse) => this.commonThen<AxiosResponse>(res, attaches))
      .catch((error: EscHttpResponse | AxiosError) => this.commonCatch(error, attaches))
  }

  post (
    urlName: string,
    data?: UniversalMap,
    attaches?: Attaches,
    config?: AxiosRequestConfig
  ) {
    return this.handle('post', urlName, data, attaches, config)
      .then((res: AxiosResponse) => this.commonThen<AxiosResponse>(res, attaches))
      .catch((error: EscHttpResponse | AxiosError) => this.commonCatch(error, attaches))
  }

  cancel (all?: boolean, name?: string, message?: string) {
    if (all) {
      cancelQueen.cancelAll(message)
    } else if (name) {
      cancelQueen.cancel(name, message)
    }
  }
  // cancelCatch (error: EscHttpResponse) {
  //   if (axios.isCancel(error) || axios.isCancel(error.error)) {
  //     console.log('Request canceled')
  //   }
  //   return Promise.reject(error)
  // }
}
