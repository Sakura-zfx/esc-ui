<template>
  <transition name="esc-dialog">
    <div v-show="show" :class="bem('wrap')">
      <div
        v-if="title"
        :class="bem('header')"
      >
        {{ title }}
      </div>
      <div
        :class="bem('content')"
      >
        <slot>
          {{ message }}
        </slot>
      </div>
      <div
        v-if="showCancelButton || showConfirmButton"
        :class="bem('btn-wrap')"
      >
        <div
          v-if="showCancelButton"
          :class="bem('btn-item')"
          @click="handleAction('cancel')"
        >
          {{ cancelButtonText }}
        </div>
        <div
          v-if="showConfirmButton"
          :class="bem('btn-item')"
          @click="handleAction('confirm')"
        >
          {{ confirmButtonText }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import { VNode } from 'vue/types'
import Bem from '@@/utils/bem'
import popup from '@@/mixins/popup'
import { DialogAction, DialogDone } from '../../types/dialog'
const bem = Bem('dialog')

// interface D {
//   loading: {
//     [index: string]: boolean,
//     confirm: boolean
//     cancel: boolean
//   }
// }

@Component({
  methods: {
    bem
  }
})
export default class Dialog extends Mixins(popup) {
  loading = {
    confirm: false,
    cancel: false
  }

  // pit 必须赋值非必须 Strict Class Initialization
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html
  @Prop() readonly title?: string
  @Prop() readonly message!: string | VNode
  @Prop() readonly confirmButtonText!: string
  @Prop() readonly cancelButtonText!: string
  @Prop() readonly showConfirmButton!: boolean
  @Prop() readonly showCancelButton!: boolean
  @Prop() readonly beforeClose?: (action: DialogAction, done: DialogDone) => void

  callback(action: string) {
    // @ts-ignore
    this[action === 'confirm' ? 'resolve' : 'reject'](action)
  }

  handleAction(action: DialogAction) {
    if (this.beforeClose) {
      this.loading[action] = true
      this.beforeClose(action, (close?: boolean) => {
        if (close !== false) {
          this.onClose(action)
        }
        this.loading[action] = false
      })
    } else {
      this.onClose(action)
    }
  }

  onClose(action: string) {
    this.close()
    if (this.callback) {
      this.callback(action)
    }
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
      // transition: .3s
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
  .esc-dialog-enter-active
    animation scale-in .3s
  .esc-dialog-leave-active
    animation scale-out .3s
  @keyframes scale-in
    from
      opacity 0
      transform translate3d(-50%, -50%, 0) scale(0.5, 0.5)
    to
      opacity 1
      transform translate3d(-50%, -50%, 0) scale(1, 1)
  @keyframes scale-out
    from
      opacity 1
      transform translate3d(-50%, -50%, 0) scale(1, 1)
    to
      opacity 0
      transform translate3d(-50%, -50%, 0) scale(0.5, 0.5)
</style>
