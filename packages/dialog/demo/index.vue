<template>
  <div class="home">
    <Layout>
      <template slot="right">dialog</template>
    </Layout>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Layout from '@/components/Layout.vue'
  import dialog from '@@/dialog/index.tsx'

  @Component({
    components: {
      Layout
    }
  })
  export default class Home extends Vue {
    mounted () {
      dialog.alert({
        container: '.esc-layout__right'
      })
    }
  }
</script>
