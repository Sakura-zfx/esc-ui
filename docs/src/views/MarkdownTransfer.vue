<template>
  <div class="home">
    <Layout>
      <template slot="center">
        <Aa />
      </template>
    </Layout>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  // import marked from 'marked'
  import Layout from '../components/Layout.vue'
  import Aa from '../../../packages/dialog/README.md'

  @Component({
    components: {
      Layout,
      Aa
    }
  })
  export default class Home extends Vue {
    created() {
      // 可以写一个webpack loader
      // 将 md 读取为字符串
      // import('../../../packages/dialog/README.md').then(res => {
      //   console.log(res)
      // })
      // console.log(import('@@/dialog/README.md'))
    }
  }
</script>

<style lang="stylus">
.home
  iframe
    width 100%
    height 100%
</style>
