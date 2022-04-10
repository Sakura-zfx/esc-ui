import Vue from 'vue'
import VueLoading from './loading'
import LoadingService from './loading-service'

// Types
import { Loading, LoadingType } from 'types/loading'

const LoadingServiceConstructor = Vue.extend(LoadingService)
const instance: LoadingType = new LoadingServiceConstructor({
  el: document.createElement('div')
})

instance.$on('input', (value: boolean): void => {
  instance.show = value
})

const LoadingClass: Loading = {
  instance,
  component: VueLoading,
  install: () => {
    Vue.prototype.$escLoading = Object.assign(instance, {
      show: false,
      isLayerTransparent: true,
      container: 'body'
    })
    Vue.component('esc-loading', VueLoading)
  }
}

export default LoadingClass
