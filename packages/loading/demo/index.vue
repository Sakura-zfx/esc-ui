<template>
  <div class="demo">
    <p>组件 loading</p>
    <esc-loading v-model="showLoading" />
    <esc-loading v-model="showLoading" color="white" />
    <p>api 调用 - 透明背景</p>
    <esc-button
      type="primary"
      text="打开 loading 2s 后关闭"
      @on-click="open()"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import Loading from '../index'
import EscButton from '@@/button/index.vue'

export default {
  name: 'index',

  components: {
    EscButton
  },

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
  @import '~@/demo/common.styl'
</style>
