<template>
  <demo-wrap name="empty">
    <empty
      title="主文案最多九个字"
      desc="辅助文案不超过十四个字四个字"
      button-text="按钮点击"
      @btnClick="btnClick"
      button-color="#f40"
      picture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRyCZSH1cbo-KDIYwL9nMffX2hxzeWZFB97ML50FpRfMNTjdO"
    />
  </demo-wrap>
</template>

<script>
import DemoWrap from '@/components/DemoWrap.vue'
import Empty from '../index'

export default {
  name: 'DemoEMPTY',
  components: {
    DemoWrap,
    Empty
  },
  methods: {
    btnClick () {
      console.log(2)
    }
  }
}
</script>
<style lang="stylus">
@import '../index.styl'
@import '../../button/index.styl'
@import '../../photo/index.styl'
.esc-demo-pd
  padding 0
.esc-empty
  .esc-button
    margin-right 0 !important
</style>
