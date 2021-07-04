import Vue, { ComponentOptions } from 'vue/types'
import popup from '../mixins/popup'

interface ComponentState extends ComponentOptions<Vue> {
  show?: boolean
  message?: string
}

function Toast (): ComponentState {
  return {
    mixins: [popup],

    props: {
      message: String
    },

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
}

export default Toast
