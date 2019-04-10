<template>
  <div class="demo">
    <p>提示</p>
    <esc-button
      plain
      color="#07c160"
      text="提示弹窗"
      @on-click="alert(0)"
    />
    <esc-button
      plain
      color="#07c160"
      text="提示弹窗(无标题)"
      @on-click="alert(1)"
    />
    <p>确认弹窗</p>
    <esc-button
      plain
      color="#07c160"
      text="确认弹窗"
      @on-click="alert(2)"
    />
    <p>异步关闭</p>
    <esc-button
      plain
      type="primary"
      text="异步关闭"
      @on-click="alert(3)"
    />
    <p>VNode</p>
    <esc-button
      plain
      color="red"
      text="VNode message"
      @on-click="alert(4)"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Layout from '@/components/Layout.vue'
  import dialog from '@@/dialog/index.ts'
  import EscButton from '@@/button/index.vue'
  import { VNode } from 'vue/types'
  import { DialogAction, DialogDone, DialogBeforeClose } from '../declare'

  @Component({
    components: {
      Layout,
      EscButton
    }
  })
  export default class Home extends Vue {
    // created() {
    //   dialog.alert({
    //     title: '没有背景',
    //     isLayerTransparent: true
    //   })
    // }

    alert (type: number) {
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
      if (type === 1) {
        options.title = '标题呢'
      } else if (type === 2) {
        options.title = '确认'
        options.showCancelButton = true
      } else if (type === 3) {
        options.title = '异步2s关闭'
        options.showCancelButton = true
        options.beforeClose = (action: DialogAction, done: DialogDone) => {
          setTimeout(() => {
            done()
          }, 2000)
        }
      } else if (type === 4) {
        options.title = 'VNode'
        options.message = this.$createElement('p', undefined, '我是VNode')
      }
      dialog.alert(options).then(action => {
        console.log(action)
      })
    }
  }
</script>

<style lang="stylus">
  @import '~@/demo/common.styl'
</style>
