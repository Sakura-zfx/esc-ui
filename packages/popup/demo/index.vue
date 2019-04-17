<template>
  <demo-wrap name="popup">
    <esc-button
      text="居中弹层"
      @on-click="show = true"
    />
    <esc-popup
      close-on-click-layer
      v-model="show"
    >
      <p @click="$dialog.alert('111')">button</p>
    </esc-popup>
  </demo-wrap>
</template>

<script>
import Vue from 'vue'
import DemoWrap from '@/components/DemoWrap.vue'
import EscPopup from '../index'
import EscButton from '../../button'
import EscDialog from '../../dialog'

export default {
  name: 'index',

  components: {
    DemoWrap,
    EscPopup,
    EscButton
  },

  data() {
    return {
      show: false
    }
  },

  created() {
    Vue.use(EscDialog)
    // setTimeout(() => {
    //   this.show = true
    // }, 2000)
  }
}
</script>

<style lang="stylus">
  @import '~@@/style/base.styl'
  @import '../index.styl'
  @import '~@@/button/index.styl'
  @import '~@@/mask-layer/index.styl'
  @import '~@@/dialog/index.styl'
</style>
