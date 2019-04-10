import Vue from 'vue'
import Loading from './Loading.vue'
import LoadingService from './LoadingService.vue'

// Types
interface LoadingType extends Vue {
  show: boolean,
  open(): void,
  close(): void
}

const LoadingConstructor = Vue.extend(Loading)
const LoadingServiceConstructor = Vue.extend(LoadingService)
const instance: LoadingType = new LoadingServiceConstructor({
  el: document.createElement('div')
})

instance.$on('input', (value: boolean): void => {
  instance.show = value
})

const Install = () => {
  Vue.prototype.$loading = Object.assign(instance, {
    show: false,
    isLayerTransparent: true
  })
  Vue.component('esc-loading', LoadingConstructor)
}
Install.instance = instance
Install.component = LoadingConstructor

export default Install
