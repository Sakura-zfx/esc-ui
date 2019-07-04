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
import Vue from 'vue'
import Toast from '../index'
import EscButton from '../../button'

export default {
  name: 'DemoToast',

  components: {
    EscButton
  },

  created () {
    Vue.use(Toast)
  },

  methods: {
    toast () {
      this.$escToast('1秒后改变文案')
      setTimeout(() => {
        Toast('反而更恶搞话题人流后加入盐计划统计和蛮好用和借款人太阳镜将')
      }, 1000)
    }
  }
}
</script>

<style lang="stylus">
@import '../../mask-layer/index.styl'
@import '../../button/index.styl'
@import '../index.styl'
</style>
