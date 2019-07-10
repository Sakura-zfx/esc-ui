import { use } from '../utils'

import { FunctionalComponentOptions, CreateElement } from 'vue/types'
type TabItem = {
  icon: string
  iconSelected: string
  name: string
  info: string
  dot: boolean
  to: string
}
type TabNavProps = {
  items: TabItem[]
  value: number
  selectedColor: string
  color: string
  fixed: boolean
  border: boolean
  redirect: boolean
  replace: boolean
  route: boolean
}

const [ bem ] = use('tab-nav')
const getItemWidth = (num: number): string => `${((1 / num) * 100).toFixed(2)}%`

function TabNav (): FunctionalComponentOptions<TabNavProps> {
  const renderItem = function (
    h: CreateElement,
    {
      items = [],
      value,
      redirect,
      route,
      replace,
      selectedColor = 'red',
      color
    }: TabNavProps,
    listeners: any,
    parent: any
  ) {
    const handleClick = function (e: Event, item: TabItem, index: number) {
      e.stopPropagation()
      listeners.input && listeners.input(index)
      if (redirect && item.to) {
        if (route && parent.$router) {
          parent.$router[replace ? 'replace' : 'push'](item.to)
        } else {
          replace ? (location.href = item.to) : location.replace(item.to)
        }
      }
    }

    return items.map((item: TabItem, index: number) => {
      const iconCls = bem('item', [
        'icon',
        { 'icon-bg': !item.icon }
      ], false)
      const isSelected = value === index
      const icon = isSelected ? item.iconSelected : item.icon
      return (
        <div
          key={item.name}
          class={bem(['item'], false)}
          style={{ width: getItemWidth(items.length), color: isSelected ? selectedColor : color }}
          onClick={(e: Event) => { handleClick(e, item, index) }}
        >
          <div class={iconCls}>
            {icon && (/http/.test(icon) ? <img src={icon} /> : <i class={`iconfont ${icon}`} />)}
            {item.info && <span class={bem('item', 'icon-info', false)}>{item.info}</span>}
          </div>
          <span class={bem('item', 'name', false)}>{item.name}</span>
        </div>
      )
    })
  }

  return {
    functional: true,

    name: 'tab-nav',

    render (h, { props, listeners, parent }) {
      return (
        <div class={bem(['ipx-bottom', { border: props.border, fixed: props.fixed }])}>
          {renderItem(h, props, listeners, parent)}
        </div>
      )
    },

    // @ts-ignore
    install (vue: any) {
      vue.component(this.name, this)
    }
  }
}

export default TabNav()
