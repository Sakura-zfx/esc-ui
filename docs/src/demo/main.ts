import Vue from 'vue'
import App from '../App.vue'
import router from './router'

Vue.config.productionTip = false

// window.onhashchange = () => {
//   const { hash, href } = window.parent.location
//   // console.log(location.hash)
//   if (hash !== location.hash) {
//     window.parent.location.href = href.split('#')[0] + location.hash
//   }
// }

// router.afterEach((to, from) => {
//   console.log(to)
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
