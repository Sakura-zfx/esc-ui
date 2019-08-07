<template>
  <demo-wrap name="popup">
    <p>默认弹层</p>
    <esc-button
      text="居中弹层"
      @on-click="showPopup('center')"
    />
    <p>居上弹层</p>
    <esc-button
      text="居上弹层"
      @on-click="showPopup('top')"
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
      <span slot="title-left">111</span>
      <span slot="title-center">标题</span>
      <esc-button
        text="嵌套弹层"
        @on-click="$escDialog.alert('我是嵌套弹层的弹窗alert')"
      />
      <esc-button
        text="手动关闭"
        @on-click="$refs.popup.close()"
      />
      <esc-button
        text="手动关闭2"
        @on-click="show = false"
      />
    </esc-popup>
    <p>带标题插槽</p>
    <esc-button
      type="primary"
      text="带标题插槽"
      @on-click="showPopup('bottom')"
    />
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
  @import '../index.styl'
  @import '~@@/style/animation.styl'
  @import '~@@/button/index.styl'
  @import '~@@/mask-layer/index.styl'
  @import '~@@/dialog/index.styl'
</style>
