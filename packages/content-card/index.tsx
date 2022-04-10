import { use, vw, isDef } from '../utils'

import { FunctionalComponentOptions } from 'vue/types'
type ContentCardProp = {
  imgSrc: string
  size: Array<number>
  padding: number
  verticalCenter: boolean
  customClass: Array<string>
}

const [ bem ] = use('content-card')
const getProps = (name: string, sizeValue?: number, cls?: string) => {
  const width = isDef(sizeValue) && vw(sizeValue as number)
  return {
    class: (bem([name, {
      grow: !isDef(sizeValue)
      // shrink: isDef(sizeValue)
    }], false) as Array<any>).concat(cls).filter(Boolean),
    style: {
      width,
      height: name === 'left' && width
    }
  }
}

function ContentCard (): FunctionalComponentOptions<ContentCardProp> {
  return {
    functional: true,

    name: 'ContentCard',

    render (h, { props, slots }) {
      const { left, center, right, centerTop, centerBottom = [] } = slots()
      const { size = [], padding = 10, imgSrc, verticalCenter, customClass = [] } = props
      const [leftWidth, rightWidth, centerWidth] = size
      const [leftCls, rightCls, centerCls] = customClass

      const renderLeft = () => (
        <div {...getProps('left', leftWidth, leftCls)}>
          {left || <img src={imgSrc} width="100%" height="100%"/>}
        </div>
      )
      const renderRight = () => (
        <div {...getProps('right', rightWidth, rightCls)}>
          {right}
        </div>
      )
      const renderCenter = () => {
        let slot: any = <span>代码是写给人看的</span>
        if (center || centerTop || centerBottom) {
          slot = (
            <div class={bem('center', 'wrap', false)}>
              {(center || centerTop) && <div class={bem('center', 'top', false)}>{center || centerTop}</div>}
              {centerBottom && <div class={bem('center', 'bottom', false)}>{centerBottom}</div>}
            </div>
          )
        }
        return <div {...getProps('center', centerWidth, centerCls)}>{slot}</div>
      }

      return (
        <div
          class={bem({ 'center': verticalCenter })}
          style={{ padding: vw(padding) }}
        >
          {leftWidth !== 0 && renderLeft()}
          {centerWidth !== 0 && renderCenter()}
          {rightWidth !== 0 && renderRight()}
        </div>
      )
    },

    install (vue: any) {
      vue.component(this.name, this)
    }
  }
}

export default ContentCard()
