<template>
  <div class="home">
    <Layout>
      <div
        class="home__page-center"
        slot="center"
      >
        <p>esc-ui</p>
        <p>企业服务移动端业务Vue组件库</p>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Layout from '../components/Layout.vue'
// import { Http } from 'esc-ui'
// import InfiniteScroll from '@@/infinite-scroll'
// Vue.use(Loading)
// Vue.prototype.$escLoading.open()
// http.get('user').then(res => {
//   console.log(res.data)
// }).catch(err => {
//   console.log(err)
// })

// import Bem from '@@/utils/bem'
// const bem = Bem('cart', 'jd')
// console.log(bem())
// console.log(bem('goods', false))
// console.log(bem('goods', ['img', { normal: true }]))
// import H from '@@/http'
// const http = new H({
//   baseUrl: 'http://youli.uban360.net',
//   urlMap: {
//     user: 'gift-front/user/me'
//   }
// })
// // console.log(http)
// const ins = http.post('user',
//   { siteId: undefined, field: ['name', 'age'] },
//   {
//     mock: true,
//     codeCallback: {
//       400: (err, msg) => {
//         console.log(err, msg)
//       }
//     },
//     notify: false
//   },
//   { params: { siteType: 3 }
//   })
// http.get('user').then(res => {
//   console.log(res.data)
// }).catch(err => {
//   console.log('err', err)
// })
// console.log(Http)

@Component({
  components: {
    Layout
  }
})
export default class Home extends Vue {
  created () {
    // console.log(this._isVue)
  }
}
</script>

<style lang="stylus">
.home
  iframe
    width 100%
    height 100%
  &__page-center
    padding 15px 40px
    p
      margin-top 20px
      font-size 30px
      &:last-child
        font-size 14px
</style>
