<template>
  <div class="home">
    <Layout>
      <template slot="right">
        <p>提示</p>
        <a href="javascript:" @click="alert()">提示弹窗</a>
      </template>
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
    alert () {
      dialog.alert({ container: '.esc-layout__right' }).then(action => {
        console.log(action)
      })
    }
  }
</script>
