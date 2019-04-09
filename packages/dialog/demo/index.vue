<template>
  <div class="home">
    <p>提示</p>
    <a href="javascript:" @click="alert(0)">提示弹窗</a> /
    <a href="javascript:" @click="alert(1)">提示弹窗(无标题)</a>
    <p>确认弹窗</p>
    <a href="javascript:" @click="alert(2)">确认弹窗</a>
    <p>异步关闭</p>
    <a href="javascript:" @click="alert(3)">异步关闭</a>
    <p>VNode</p>
    <a href="javascript:" @click="alert(4)">VNode message</a>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { VNode } from 'vue/types'
  import Layout from '@/components/Layout.vue'
  import dialog from '@@/dialog/index.tsx'
  import { DialogAction, DialogDone, DialogBeforeClose } from '../../../types/dialog'

  @Component({
    components: {
      Layout
    }
  })
  export default class Home extends Vue {
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
.home
  padding 10px
</style>
