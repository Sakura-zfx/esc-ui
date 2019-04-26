<template>
  <demo-wrap name="popup">
    <p>默认弹层</p>
    <esc-button
      text="居中弹层"
      @on-click="showPopup('center')"
    />
    <p>居右弹层</p>
    <esc-button
      type="primary"
      text="居右弹层"
      @on-click="showPopup('right')"
    />
    <p>居底弹层</p>
    <esc-button
      type="primary"
      text="居底弹层"
      plain
      @on-click="showPopup('bottom')"
    />
    <esc-popup
      ref="popup"
      :position="position"
      close-on-click-layer
      v-model="show"
    >
      <esc-button
        text="嵌套弹层"
        @on-click="$dialog.alert('我是嵌套弹层的弹窗alert')"
      />
      <esc-button
        text="手动关闭"
        @on-click="$refs.popup.close()"
      />
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
  name: 'Index',

  components: {
    DemoWrap,
    EscPopup,
    EscButton
  },

  data () {
    return {
      show: false,
      position: 'center'
    }
  },

  created () {
    Vue.use(EscDialog)
  },

  methods: {
    showPopup (position) {
      this.show = true
      this.position = position
    }
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
