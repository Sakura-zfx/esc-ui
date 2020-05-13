import Vue from 'vue'
import { RenderContext } from 'vue/types'
import Composition, { defineComponent, reactive, ref } from '@vue/composition-api'
// import { vw, isDef } from '../utils'
import useBem from '../bem'
Vue.use(Composition)

type Prop = {
  color: string
  load: (level: number, selected: Item[]) => Promise<Item[]>
}
type State = {
  curLevel: number
  selected: Item[]
  end: boolean
  loading: boolean
}
type Item = {
  name: string
  code: number
}
const bem = useBem('city-select', 'esc')

const Title = (cp: RenderContext) => {
  // console.log(cp)
  const state = cp.props.state as State
  return (
    <div class={bem('title')}>
      {
        state.selected.map((it, i) => {
          return (
            <div
              key={it.name}
              class={bem('title-item')}
              onClick={() => (cp.listeners.tab as Function)(it, i)}
            >
              { it.name }
              {
                state.curLevel - 1 === i &&
                  <span
                    class={bem('title-item', 'active')}
                    style={{ background: cp.props.color }}
                  />
              }
            </div>
          )
        })
      }
      {
        !state.end && <div class={bem('title-item')}>请选择</div>
      }
    </div>
  )
}

export default defineComponent<Prop>({
  name: 'CitySelect',

  props: {
    value: Array,
    color: {
      type: String,
      default: 'red'
    },
    load: {
      type: Function,
      default () {
        return Promise.resolve([])
      }
    }
  },

  setup (props, context) {
    const state = reactive<State>({
      curLevel: 0,
      selected: [],
      end: false,
      loading: false
    })
    const list = ref<Item[]>([])
    const handleTab = (item: Item, i: number) => {
      if (state.curLevel !== i + 1) {
        state.curLevel = i + 1
        state.selected = state.selected.slice(0, i + 1)
        loadData()
      }
    }
    const handleSelect = (item: Item) => {
      state.curLevel += 1
      state.selected.push(item)
      loadData()
    }

    const loadData = () => {
      state.loading = true
      props.load(state.curLevel, state.selected).then(res => {
        state.loading = false
        const hasData = res && res.length
        state.end = !hasData
        list.value = hasData ? res : []
        if (state.end) {
          context.emit('input', state.selected)
        }
      }).catch(() => {
        state.loading = false
      })
    }

    loadData()

    return () => (
      <div class={bem()}>
        <Title
          // @ts-ignore
          color={props.color}
          state={state}
          onTab={handleTab}
        />
        <div class={bem('content')}>
          {
            state.loading || state.end ? (
              <div class={bem('loading')}>
                <span>{ state.end ? '选择完成' : '加载中...' }</span>
              </div>
            ) : list.value.map(it => {
              return (
                <div
                  class={bem('item')}
                  key={state.curLevel + it.name}
                  onClick={() => handleSelect(it)}
                >
                  {it.name}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  },

  install (vue: any) {
    vue.component(this.name, this)
  }
})
