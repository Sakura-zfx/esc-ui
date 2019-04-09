<template>
  <div class="home">
    <Layout>
      <component :is="current" slot="center" />
    </Layout>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import Layout from '../components/Layout.vue'
  import Dialog from '@@/dialog/README.md'

  @Component({
    components: {
      Layout,
      Dialog
    }
  })
  export default class Home extends Vue {
    current: string = ''

    @Watch('this.$route.path')
    onPathChange(val: string) {
      this.pathChange(val)
    }

    created() {
      this.pathChange()
    }

    pathChange(name: string = this.$route.path.substring(1)) {
      this.current = name[0].toUpperCase() + name.substring(1)
    }
  }
</script>

<style lang="stylus">
.home
  iframe
    width 100%
    height 100%
</style>
