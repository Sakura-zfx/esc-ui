import { FunctionalComponentOptions } from 'vue/types'
import { use, noop, aliasComponent } from '../utils'
import Button from '../button'
import Photo from '../photo'

type Prop = {
  picture: string
  title: string
  desc: string
  buttonText: string
  full: boolean | string
  buttonColor: string,
  background: string
}

function Empty (): FunctionalComponentOptions<Prop> {
  const [ bem ] = use('empty')
  const [ escbutton, escphoto ] = aliasComponent(Button, Photo)

  return {
    functional: true,
    name: 'Empty',
    render (h, { props, listeners }) {
      const { picture, title, desc, buttonText, full, background, buttonColor } = props
      const { btnClick } = listeners
      const isFull = full === '' || full
      const style = isFull ? { height: '100vh', background } : { background }
      return (
        <div class={bem()} style={style}>
          {
            picture && (
              <escphoto
                style="margin: 0 auto;"
                src={picture}
                width={130}
                height={130}
                cover
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
                color={buttonColor}
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
