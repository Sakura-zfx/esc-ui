// eslint-disable-next-line
import axios from 'axios'

// Types
import { EscHttp, EscHttpOptions, UniversalMap, EscHttpResponse, EscHttpError, LoadingObject } from 'types/http'
// eslint-disable-next-line
import { AxiosResponse, AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'

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
  beforeRequest (data) {
    return data
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
    if (this.stack.length === 0) {
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

  get (
    urlName: string,
    data?: UniversalMap,
    attaches?: UniversalMap,
    config?: AxiosRequestConfig
  ) {
    const {
      beforeRequest,
      beforeThen,
      beforeCatch,
      urlMap,
      loadingMethods,
      successRequestAssert
    } = this.options

    let path: string = urlMap[urlName]
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

    // loading
    loading.add(loadingMethods, attaches)

    if (beforeRequest && typeof beforeRequest === 'function') {
      mergeConfig = beforeRequest(mergeConfig, attaches)
    }

    return (<AxiosInstance> this.instance).get(path, mergeConfig)
      .then((res: AxiosResponse): EscHttpResponse | Promise<EscHttpResponse> => {
        if (beforeThen && typeof beforeThen === 'function') {
          res = beforeThen(res, attaches)
        }

        // loading
        loading.pop(attaches)

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
      })
      .catch((error: EscHttpResponse | EscHttpError): EscHttpError | Promise<EscHttpError> => {
        let finalError: EscHttpError
        const isResponseReject = (<EscHttpResponse> error).status && (<EscHttpResponse> error).headers
        // @ts-ignore
        finalError = isResponseReject ? {
          config: error.config,
          // code: (<EscHttpResponse> error).status,
          request: error.request,
          response: (<EscHttpResponse> error),
          attaches
        } : error

        if (beforeCatch && typeof beforeCatch === 'function') {
          error = beforeCatch(finalError, attaches)
        }

        if (isResponseReject) {
          return Promise.reject(finalError)
        }
        if (axios.isCancel(error)) {
          console.log('Request canceled', (error as EscHttpError).message)
        }

        // eslint-disable-next-line
        return Promise.reject({
          ...error,
          attaches
        })
      })
  }
}
