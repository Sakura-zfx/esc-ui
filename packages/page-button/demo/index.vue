<template>
  <demo-wrap
    name="page-button"
  >
    <page-button
      :buttons="[
        { text: '联系客服', color: '#FF4D4D', opacity: 0, round: true },
        { text: '审批通过', color: '#2DC888', click: handleClick }
      ]"
    />
  </demo-wrap>
</template>

<script>
import DemoWrap from '@/components/DemoWrap.vue'
import PageButton from '../'

export default {
  name: 'DemoPageButton',

  components: {
    DemoWrap,
    PageButton
  },
  methods: {
    handleClick () {
      // this.$dialog('审批通过')
    }
  }
}
</script>
<style lang="stylus">
@import '../index.styl';
@import '../../button/index.styl';
</style>
