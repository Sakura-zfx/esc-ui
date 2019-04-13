<script lang="tsx">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Bem from '../utils/bem'

@Component
export default class EscMask extends Vue {
  @Prop(Number) readonly zIndex!: number
  @Prop(Boolean) readonly visible!: boolean
  @Prop({ default: false, type: Boolean }) readonly isTransparent!: boolean

  render() {
    const bem = Bem('mask')

    return (
      <transition name="esc-fade">
        <div
          vShow={this.visible}
          style={{zIndex: this.zIndex}}
          class={bem({ transparent: this.isTransparent })}
        />
      </transition>
    )
  }
}
</script>

<style lang="stylus">
@import '../style/var.styl'
.esc-mask
  position fixed
  width 100%
  left 0
  top 0
  bottom 0
  background-color mask-background-color
  &__transparent
    background-color transparent
.esc-fade-enter-active
  animation fade-in .3s
.esc-fade-leave-active
  animation fade-out .3s
@keyframes fade-in
  from
    opacity 0
  to
    opacity 1
@keyframes fade-out
  from
    opacity 1
  to
    opacity 0
</style>
