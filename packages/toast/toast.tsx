import { Prop, Component, Mixins } from 'vue-property-decorator'
import popup from '../mixins/popup'

@Component
export default class Toast extends Mixins(popup) {
  @Prop({ type: String }) readonly message!: string

  render () {
    return (
      <transition name="fade">
        <div
          vShow={this.show}
          class="esc-toast"
        >
          <div class="esc-toast__text">{
            this.message && this.message.length > 200
              ? this.message.substr(0, 200)
              : this.message
          }</div>
        </div>
      </transition>
    )
  }
}
