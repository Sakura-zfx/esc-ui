import Vue from 'vue'
// import { plugin, state, value, computed, watch, onMounted } from 'vue-function-api'
import { vw } from '../utils'
import useBem from '../bem'

// Vue.use(plugin)
const bem = useBem('skeleton', 'esc')

function renderStrip (this: any, h: any) {
  const { rows }: { rows: Array<string | number> } = this
  return (
    <div class={bem('strip')}>
      {
        rows.map((width: string | number) => (
          <div
            class={bem('strip', 'item')}
            style={{ width: typeof width === 'number' ? vw(width) : width }}
          />
        ))
      }
    </div>
  )
}

function renderBlock (this: any, h: any) {
  const { blockWidth } = this
  return <div class={bem('block')} style={{ width: vw(blockWidth), height: vw(blockWidth) }} />
}

export default Vue.extend({
  name: 'Skeleton',

  props: {
    strip: {
      type: Boolean,
      default: true
    },
    block: Boolean,
    hasBlock: Boolean,
    blockWidth: {
      type: Number,
      default: 60
    },
    rows: {
      type: Array,
      default: () => ['90%', '50%', '30%']
    }
  },

  methods: {
  },

  render (h) {
    const { strip, hasBlock, block }: any = this
    return (
      <div class={bem()}>
        {(hasBlock || block) && renderBlock.call(this, h)}
        {!block && strip && renderStrip.call(this, h)}
      </div>
    )
  }
})
