import Vue from 'vue'
import Composition, { defineComponent } from '@vue/composition-api'
// import { vw, isDef } from '../utils'
import useBem from '../bem'
Vue.use(Composition)

type Prop = {
  type: 'default' | 'success'
  size: 'normal' | 'large'
  color: string[]
}
const bem = useBem('tag', 'esc')

export default defineComponent<Prop>({
  name: 'Tag',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'normal'
    },
    color: {
      type: Array,
      default () {
        return []
      }
    }
  },

  setup (props, context) {
    return () => (
      <div
        class={bem([props.type, props.size], undefined, true)}
        style={{
          background: props.color[0],
          color: props.color[1]
        }}
      >
        {context.slots.default()}
      </div>
    )
  },

  install (vue: any) {
    vue.component(this.name, this)
  }
})
