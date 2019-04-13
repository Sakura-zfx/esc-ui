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
          <loading :value="true" v-if="loading.cancel" />
          <span v-else>{{ cancelButtonText }}</span>
        </div>
        <div
          v-if="showConfirmButton"
          :class="bem('btn-item')"
          @click="handleAction('confirm')"
        >
          <loading :value="true" v-if="loading.confirm" />
          <span v-else>{{ confirmButtonText }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import { use } from '@@/utils'
import popup from '@@/mixins/popup'
// 关于loading的引入，是否可以采用外部引入？以减少代码冗余
import Loading from '@@/loading/Loading.vue'
// Types
import { VNode } from 'vue/types'
import { DialogAction } from 'types/dialog'

const [ bem ] = use('dialog')

@Component({
  components: {
    Loading
  },
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
  @Prop(String) readonly title?: string
  @Prop([String, Object]) readonly message!: string | VNode
  @Prop(String) readonly confirmButtonText!: string
  @Prop(String) readonly cancelButtonText!: string
  @Prop(Boolean) readonly showConfirmButton!: boolean
  @Prop(Boolean) readonly showCancelButton!: boolean
  @Prop(Function) readonly beforeClose!: (action: DialogAction, done: (close?: boolean) => void) => void

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

  onClose(action: DialogAction) {
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
      flex-basis 50%
      flex-grow 1
      flex-shrink 0
      height 44px
      padding 0 5px
      color link-color
      border-right 1px border-color solid
      &:last-child
        border-right none
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
