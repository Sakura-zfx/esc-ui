<template>
  <demo-wrap name="dialog">
    <p>提示</p>
    <esc-button
      plain
      color="#07c160"
      text="提示弹窗(无标题)"
      @on-click="handleClick(0)"
    />
    <esc-button
      plain
      color="#07c160"
      text="提示弹窗"
      @on-click="handleClick(1)"
    />
    <p>确认弹窗</p>
    <esc-button
      plain
      color="#07c160"
      text="确认弹窗"
      @on-click="handleClick(2)"
    />
    <p>内容加粗弹窗</p>
    <esc-button
      plain
      color="#07c160"
      text="内容加粗弹窗"
      @on-click="handleClick(5)"
    />
    <p>异步关闭</p>
    <esc-button
      plain
      type="primary"
      text="异步关闭"
      @on-click="handleClick(3)"
    />
    <p>VNode</p>
    <esc-button
      plain
      color="red"
      text="VNode message"
      @on-click="handleClick(4)"
    />
  </demo-wrap>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Layout from '@/components/Layout.vue'
import DemoWrap from '@/components/DemoWrap.vue'
import Dialog from '@@/dialog/index.ts'
import EscButton from '@@/button/index.tsx'
// Types
import { VNode } from 'vue/types'
import { DialogAction, DialogBeforeClose } from 'types/dialog'

@Component({
  components: {
    Layout,
    EscButton,
    DemoWrap
  }
})
export default class Home extends Vue {
  created () {
    // dialog.alert({
    //   title: '没有背景',
    //   isLayerTransparent: true
    // })
    Vue.use(Dialog)
    // this.$escDialog(this.$createElement('span', undefined, '我是VNode'))
  }

  handleClick (type: number) {
    const options: {
      title: string,
      message: string | VNode,
      showCancelButton: boolean,
      beforeClose: undefined | DialogBeforeClose
    } = {
      title: '',
      message: '代码是写出来给人看的，附带能在机器上运行代码是写出来给人看的',
      showCancelButton: false,
      beforeClose: undefined
    }
    if (type === 0) {
      this.$escDialog.alert(options)
    } else if (type === 5) {
      options.title = '确定要删除吗？'
      options.message = ''
      this.$escDialog.confirm(options)
    } else if (type === 1) {
      this.$escDialog.alert(options.message as string)
    } else if (type === 2) {
      options.title = ''
      this.$escDialog.confirm(options)
    } else if (type === 3) {
      options.title = '异步2s关闭'
      options.showCancelButton = true
      options.beforeClose = (action: DialogAction, done: () => void) => {
        setTimeout(() => {
          done()
        }, 2000)
      }
      this.$escDialog(options)
    } else if (type === 4) {
      options.title = 'VNode'
      options.message = this.$createElement('span', undefined, '我是VNode')
      this.$escDialog(options)
    }
  }
}
</script>

<style lang="stylus">
  @import '../../style/base.styl'
  @import '../index.styl'
  @import '../../button/index.styl'
  @import '../../loading/index.styl'
  @import '../../mask-layer/index.styl'
</style>
