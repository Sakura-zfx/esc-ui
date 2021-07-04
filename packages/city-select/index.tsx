import Vue from 'vue'
// import { RenderContext } from 'vue/types'
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
  selectTitleIndex: number
  selected: Item[]
  end: boolean
  loading: boolean
}
type Item = {
  name: string
  code: number
}
const bem = useBem('city-select', 'esc')

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
    const cacheLevelList: Item[] = []
    const state = reactive<State>({
      curLevel: 0,
      selectTitleIndex: -1,
      selected: [],
      end: false,
      loading: false
    })
    const list = ref<Item[]>([])
    const handleTab = (item: Item, i: number) => {
      if (state.curLevel !== i) {
        state.curLevel = i
        state.selectTitleIndex = i
        state.selected = state.selected.slice(0, i + 1)
        if (cacheLevelList[i]) {
          state.end = false
          // @ts-ignore
          list.value = cacheLevelList[i]
        } else {
          loadData()
        }
        context.emit('click-item', item, state.curLevel, state.selected)
      }
    }
    const handleSelect = (item: Item) => {
      state.curLevel += 1
      if (state.selectTitleIndex > -1) {
        state.selected.splice(state.selectTitleIndex, 1, item)
      } else {
        state.selected.push(item)
      }
      state.selectTitleIndex = -1
      loadData()
      context.emit('click-item', item, state.curLevel, state.selected)
    }

    const loadData = () => {
      state.loading = true
      props.load(state.curLevel, state.selected).then(res => {
        state.loading = false
        const hasData = res && res.length
        state.end = !hasData
        list.value = hasData ? res : []
        // @ts-ignore
        cacheLevelList[state.curLevel] = list.value
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
        <div class={bem('title')}>
          {
            state.selected.map((it, i) => {
              return (
                <div
                  key={it.name}
                  class={bem('title-item')}
                  onClick={() => handleTab(it, i)}
                >
                  { it.name }
                  {
                    state.curLevel === i &&
                    <span
                      class={bem('title-item', 'active')}
                      style={{ background: props.color }}
                    />
                  }
                </div>
              )
            })
          }
          {
            !state.end && (
              <div class={bem('title-item')}>
                请选择
                <span
                  style={{
                    display: state.selectTitleIndex > -1 ? 'none' : undefined,
                    background: props.color
                  }}
                  class={bem('title-item', 'active')}
                />
              </div>
            )
          }
        </div>
        <div class={bem('content')}>
          {
            state.loading || state.end ? (
              <div class={bem('loading')}>
                <span>{ state.end ? '没有下一级了~' : '加载中...' }</span>
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
