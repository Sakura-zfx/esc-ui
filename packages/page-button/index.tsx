import Vue from 'vue'
// import { ComponentOptions } from 'vue/types'
import Composition, { defineComponent } from '@vue/composition-api'
// import { vw, isDef } from '../utils'
import useBem from '../bem'
import Button from '../button'
import { hexToRgba, noop } from '../utils'

Vue.use(Composition)
type Prop = {
  buttons: Array<{
    text: string
    color: string
    click: () => void
    opacity: number
  }>
}
const bem = useBem('page-button', 'esc')

export default defineComponent<Prop>({
  components: {
    EscButton: Button
  },
  props: {
    buttons: {
      type: Array,
      default: () => {
        return [
          {
            text: '提 交',
            color: '#FF4D4D',
            click: () => {
              console.log('click page button')
            }
          }
        ]
      }
    }
  },
  setup (props) {
    return () => (
      <div class={bem()}>
        {
          props.buttons.map(it => (
            <esc-button
              type="primary"
              color={/#/.test(it.color) ? hexToRgba(it.color, it.opacity || 1) : it.color}
              onClick={it.click || noop}
              style={{
                color: it.opacity && it.opacity < 1 && it.color
              }}
            >{it.text}</esc-button>
          ))
        }
      </div>
    )
  }
})
