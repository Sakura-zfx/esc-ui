import { Component, Prop, Mixins } from 'vue-property-decorator'
import { use } from '../utils'
import popup from '../mixins/popup'

const [bem] = use('popup')

type Position = 'center' | 'bottom' | 'right'

@Component
export default class EscPopup extends Mixins(popup) {
  @Prop({ type: String, default: 'center' }) readonly position!: Position

  get isCenter() {
    return this.position === 'center'
  }

  render() {
    return (
      <transition name={this.isCenter ? 'esc-dialog' : ''}>
        <div vShow={this.show} class={bem([this.position])}>
          {this.$slots.default}
        </div>
      </transition>
    )
  }
}
