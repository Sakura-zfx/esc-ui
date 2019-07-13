import { FunctionalComponentOptions } from 'vue/types'
import { use, vw, isDef } from '../utils'

type Prop = {
}
const [ bem ] = use('a-b')

function AB (): FunctionalComponentOptions<Prop> {
  return {
    functional: true,
    name: 'AB',
    render (h, { props }) {
      return (
        <div class={bem()}>
        </div>
      )
    },
    install (vue: any) {
      vue.component(this.name, this)
    }
  }
}
export default AB()
