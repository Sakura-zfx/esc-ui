import Vue from 'vue'
// import { defineComponent, computed, watch, onMounted } from '@vue/composition-api'
// import { vw, isDef } from '../utils'
import useBem from '../bem'

type Prop = {
  uid: string | number
  name: string
  defaultUrl?: string
  prefix: string
  round?: boolean
  radius?: string
  size?: string
}
const bem = useBem('avatar', 'esc')

export default Vue.extend<{}, {}, {}, Prop>({
  name: 'Avatar',

  props: {
    uid: {
      type: [String, Number],
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    defaultUrl: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: () => {
        // @ts-ignore
        return window._APP_CONFIG && window._APP_CONFIG.avatarUrl
      }
    },
    round: Boolean,
    radius: {
      type: String,
      default: '4px'
    },
    size: {
      type: String,
      default: '45px'
    }
  },

  render () {
    const style = {
      width: this.size,
      height: this.size,
      borderRadius: this.round ? '50%' : this.radius,
      background: this.defaultUrl ? `url(${this.defaultUrl}) center / 100% 100%` : '#3b8ff6'
    }
    const bgUrl = this.prefix + this.uid
    return (
      <div class={bem()} style={style}>
        {!this.defaultUrl && this.name && <span>{ this.name.substr(-2) }</span>}
        {this.uid && <div class={bem('img')} style={{ backgroundImage: `url(${bgUrl})` }} />}
      </div>
    )
  },

  install (vue: any) {
    vue.component(this.name, this)
  }
})
