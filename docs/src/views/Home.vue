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
// import Bem from '@@/utils/bem'
// const bem = Bem('cart', 'jd')
// console.log(bem())
// console.log(bem('goods', false))
// console.log(bem('goods', ['img', { normal: true }]))

@Component({
  components: {
    Layout
  }
})
export default class Home extends Vue {
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
