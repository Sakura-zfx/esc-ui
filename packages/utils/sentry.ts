/**
 * vue spa 错误捕捉
 */
import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import { online } from './index'

import { EscSentryOption, EscSentry as EscSentryType } from 'types/sentry'

const defaultOptions: EscSentryOption = {
  dsn: 'https://cc415d712650488a936395f97869ecf1@sentry.io/212146', // shinemo/esc
  open: online,
  release: undefined,
  preventRejection: true
}

export default class EscSentry implements EscSentryType {
  options: EscSentryOption = {}
  sentryInstance: any = null

  constructor (options?: EscSentryOption) {
    if (options && typeof options !== 'object') {
      throw new Error('sentry options must be a object')
    }
    this.options = {
      ...defaultOptions,
      ...options
    }

    if (this.options.preventRejection) {
      window.addEventListener('unhandledrejection', e => {
        e.preventDefault()
        return true
      })
    }

    this.init()
  }

  init () {
    const { open, dsn, release } = this.options
    if (open) {
      Sentry.init({
        dsn,
        integrations: [
          new Integrations.Vue({
            Vue,
            attachProps: true
          })
        ],
        release
      })
      this.sentryInstance = Sentry
    }
  }

  captureException (err: Error) {
    if (
      this.options.open &&
      this.sentryInstance &&
      err instanceof Error
    ) {
      this.sentryInstance.captureException(err)
    }
  }

  captureMessage (msg: string, level?: string) {
    if (
      this.options.open &&
      this.sentryInstance &&
      typeof msg === 'string'
    ) {
      this.sentryInstance.captureMessage(msg, level)
    }
  }
}

// export const instance = new EscSentry({
//   preventRejection: false
// })
