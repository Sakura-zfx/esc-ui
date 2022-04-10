import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/markdown.css'
// import Composition from '@vue/composition-api'
Vue.config.productionTip = false

// Vue.use(Composition)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
