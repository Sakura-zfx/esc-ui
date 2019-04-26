import { Component, Prop, Vue } from 'vue-property-decorator'
import { use } from '../utils'

@Component
export default class EscMask extends Vue {
  @Prop(Number) readonly zIndex!: number
  @Prop(Boolean) readonly visible!: boolean
  @Prop({ default: false, type: Boolean }) readonly isTransparent!: boolean

  render () {
    const [ bem ] = use('mask')

    return (
      <transition name="esc-fade">
        <div
          vShow={this.visible}
          style={{ zIndex: this.zIndex }}
          class={bem({ transparent: this.isTransparent })}
          onClick={() => this.$emit('on-close')}
        />
      </transition>
    )
  }
}
