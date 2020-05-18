<template>
  <div class="home">
    <Layout>
      <div
        class="home__page-center"
        slot="center"
      >
        <p>esc-ui</p>
        <p>Vue + ts 实践业务组件库</p>
        <!--<input type="file" @change="upload">-->
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
import H from '@@/http'
const http = new H({
  // baseUrl: 'http://api.jituancaiyun.net',
  baseUrl: 'http://youli.uban360.net',
  // baseUrl: 'https://filesystem.api.jituancaiyun.com',
  urlMap: {
    a: {
      b: {
        user: '/gift-front/user/me',
        upload: '/sfs/webUpload/srvfile?fileType=2&src=cdn',
        check: '/webaace/VpmnProduct/check'
      }
    }
  },
  contentType: 'application/json',
  useQsStringifyBody: false,
  beforeRequest (data, config) {
    // data.id = 1
    return {
      data: {
        siteId: 1
      }
    }
  },
  beforeThen (res, attaches) {
    console.log(res)
    return null
  }
  // arrayFormat: 'brackets'
})
http.get('a/b/user', { id: 1 })
// http.cancel(true)

// http.post('check', null, null, {
//   headers: {
//     'content-type': 'www'
//   }
// })

// const ins = http.get('user',
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
// http.cancel(false, 'user')

@Component({
  components: {
    Layout
  }
})
export default class Home extends Vue {
  created () {
    // console.log(this._isVue)
  }

  // upload (e: any) {
  //   const http = new H({
  //     // baseUrl: 'http://youli.uban360.net',
  //     baseUrl: 'https://filesystem.api.jituancaiyun.com',
  //     urlMap: {
  //       upload: '/sfs/webUpload/srvfile?fileType=2&src=cdn'
  //     }
  //   })
  //   http.post('upload', {
  //     upfile: e.target.files[0]
  //   }, { isUpload: true }, {
  //     onUploadProgress (e) {
  //       console.log(e)
  //     }
  //   })
  // }
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
