import Vue from 'vue'
// import VueLoading from './Loading.vue'
// @ts-ignore
import VueLoading from './loading.tsx'
// import LoadingService from './LoadingService.vue'
// @ts-ignore
import LoadingService from './loading-service.tsx'
// import LoadingService from './LoadingService.vue'

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
  open: () => null,
  close: () => null,
  install: () => {
    Vue.prototype.$loading = Object.assign(instance, {
      show: false,
      isLayerTransparent: true
    })
    Vue.component('esc-loading', VueLoading)
  }
}

export default LoadingClass
