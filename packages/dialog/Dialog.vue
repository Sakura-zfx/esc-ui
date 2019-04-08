<template>
  <div :class="bem('wrap')">
    <div :class="bem('header')">标题</div>
    <div :class="bem('content')">代码是写出来给人看的，附带能在机器上运行</div>
    <div :class="bem('btn-wrap')">
      <div :class="bem('btn-item')" @click="onCancel">取 消</div>
      <div :class="bem('btn-item')" @click="onConfirm">确 认</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Mixins } from 'vue-property-decorator'
  import Bem from '@@/utils/bem'
  import popup from '@@/mixins/popup'
  const bem = Bem('dialog')

  @Component
  export default class Dialog extends Mixins(popup) {
    showDialog: boolean = false

    // pit 必须赋值非必须 Strict Class Initialization
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html
    @Prop() readonly content!: string

    bem(model: string, modifier?: string): string {
      return bem(model, modifier)
    }

    created() {
    }

    onCancel() {

    }

    onConfirm() {

    }
  }
</script>

<style lang="stylus">
  @import '../style/var.styl'
  .esc-dialog
    &__wrap
      position: fixed
      top: 50%
      left: 50%
      width: 85%
      font-size: 16px
      overflow: hidden
      transition: .3s
      background-color: #fff
      transform: translate3d(-50%, -50%, 0)
      backface-visibility: hidden
      text-align: center
      border-radius: 12px
    &__header
      font-weight: 500
      padding: 20px 20px 0
    &__content
      max-height: 250px
      overflow: auto
      color: #262a30
      padding: 15px 20px
      font-size 14px
    &__btn-wrap
      display flex
      align-items center
      border-top 1px border-color solid
    &__btn-item
      display flex
      align-items center
      justify-content center
      flex-grow 1
      height 44px
      color button-font-color
      &:first-child
        border-right 1px border-color solid
</style>
