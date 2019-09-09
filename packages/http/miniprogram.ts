import BaseHttp from './base'
import { Attaches, EscHttpResponse, UniversalMap } from '../../types/http'
import { loading } from './loading'

export default class HttpMini extends BaseHttp {
  // constructor (options: EscHttpOptions) {
  //   super(options)
  // }
  handle (
    method: string,
    urlName: string,
    data?: UniversalMap,
    attaches?: UniversalMap
  ) {
    const path = this.getPath(urlName)

    const { loadingMethods } = this.options
    loading.add(loadingMethods, attaches)

    const { miniprogramRequestHandle } = this.options
    if (miniprogramRequestHandle) {
      return miniprogramRequestHandle(method, path, data, attaches)
    }
    throw new Error('miniprogramRequestHandle is not defined')
  }

  get<T> (
    urlName: string,
    data?: UniversalMap,
    attaches?: Attaches
  ) {
    return this.handle('get', urlName, data, attaches)
      // @ts-ignore
      .then((res: EscHttpResponse) => this.commonThen(res, attaches))
      .catch((error: EscHttpResponse) => this.commonCatch(error, attaches))
  }

  post<T> (
    urlName: string,
    data?: UniversalMap,
    attaches?: Attaches
  ) {
    return this.handle('post', urlName, data, attaches)
      // @ts-ignore
      .then((res: EscHttpResponse) => this.commonThen(res, attaches))
      .catch((error: EscHttpResponse) => this.commonCatch(error, attaches))
  }
}
