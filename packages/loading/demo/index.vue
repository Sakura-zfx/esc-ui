<template>
  <div class="demo-loading">
    <p>组件 loading</p>
    <esc-loading v-model="showLoading" />
    <esc-loading v-model="showLoading" color="white" />
    <p>api 调用 - 透明背景</p>
    <a href="javascript:" @click="open()">打开 loading 2s 后关闭</a>
  </div>
</template>

<script>
import Vue from 'vue'
import Loading from '../index'

export default {
  name: 'index',

  data() {
    return {
      showLoading: true
    }
  },

  created() {
    Vue.use(Loading)
  },

  methods: {
    open() {
      this.$loading.open()
      setTimeout(() => {
        this.$loading.close()
      }, 2000)
    }
  }
}
</script>

<style lang="stylus">
.demo-loading
  padding 10px
</style>
