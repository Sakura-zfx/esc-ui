import { FunctionalComponentOptions } from 'vue/types'
import { use, vw, isDef } from '../utils'
import Button from '../button'

type Prop = {
  picture: string
  title: string
  desc: string
  buttonText: string
  isFull: boolean
  background: string
}
const [ bem ] = use('empty')

function Empty (): FunctionalComponentOptions<Prop> {
  return {
    functional: true,
    name: 'Empty',
    render (h, { props, listeners }) {
      const { picture, title, desc, buttonText, isFull, background } = props
      const { btnClick } = listeners
      const escbutton = Button
      const style = isFull ? { height: '100vh', background } : { background }
      return (
        <div class={bem()} style={style}>
          {
            Boolean.call(picture) && (
              <img
                src={picture}
                class={bem('img')}
              />
            )
          }
          <p class={bem('title', false)}>{ title }</p>
          <p class={bem('desc', false)}>{ desc }</p>
          {
            buttonText && (
              <escbutton
                type="primary"
                size="small"
                text={buttonText}
                on={{ 'on-click': btnClick || noop }}
              />
            )
          }
        </div>
      )
    },
    install (vue: any) {
      vue.component(this.name, this)
    }
  }
}
export default Empty()
