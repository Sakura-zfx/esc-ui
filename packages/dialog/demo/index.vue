<template>
  <div class="home">
    <p>提示</p>
    <a href="javascript:" @click="alert()">提示弹窗</a>
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
      dialog.alert({}).then(action => {
        console.log(action)
      })
    }
  }
</script>
