<template>
  <div style="padding: 15px">
    <esc-button
      type="primary"
      round
      plain
      text="打开 Toast"
      @on-click="toast"
    />
  </div>
</template>

<script>
// import Vue from 'vue'
import Toast from '../index'
import EscButton from '../../button'

export default {
  name: 'DemoToast',

  components: {
    EscButton
  },

  created () {
    // Vue.use(Toast)
  },

  methods: {
    toast () {
      // console.log(1)
      // this.$escToast('1秒后改变文案')
      Toast('代码是写给人看的，同样的')
      // setTimeout(() => {
      // }, 1000)
    }
  }
}
</script>

<style lang="stylus">
@import '../../mask-layer/index.styl'
@import '../../button/index.styl'
@import '../index.styl'
</style>
