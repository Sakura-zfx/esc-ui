import { Component, Prop, Mixins } from 'vue-property-decorator'
import { use } from '@@/utils'
import popup from '@@/mixins/popup'
// 关于loading的引入，是否可以采用外部引入？以减少代码冗余
// @ts-ignore
import Loading from '@@/loading/loading.tsx'
// Types
import { VNode } from 'vue/types'
import { DialogAction } from 'types/dialog'

const [ bem ] = use('dialog')

@Component({
  components: {
    'esc-loading': Loading
  }
  // methods: {
  //   bem
  // }
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

  renderBtnItem(type: DialogAction) {
    return (
      <div
        class={bem('btn-item', false)}
        onClick={this.handleAction.bind(this, type)}
      >
        {
          this.loading[type]
            ? <esc-loading value={true} />
            : <span>{type === 'cancel' ? this.cancelButtonText : this.confirmButtonText}</span>
        }
      </div>
    )
  }

  render() {
    const Title = this.title && <div class={bem('header', false)}>{this.title}</div>
    const Content = <div class={bem('content', false)}><slot>{this.message}</slot></div>
    const Btn = (this.showCancelButton || this.showConfirmButton) && (
      <div class={bem('btn-wrap', false)}>
        {this.showCancelButton && this.renderBtnItem('cancel')}
        {this.showConfirmButton && this.renderBtnItem('confirm')}
      </div>
    )

    return (
      <transition name='esc-dialog'>
        <div vShow={this.show} class={bem('wrap', false)}>
          {Title}
          {Content}
          {Btn}
        </div>
      </transition>
    )
  }
}
