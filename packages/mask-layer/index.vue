<script lang="tsx">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Bem from '../utils/bem'
  const bem = Bem('mask')

  @Component({
  })
  export default class EscMask extends Vue {
    @Prop() readonly zIndex!: number

    render() {
      return (
        <transition name="esc-fade">
          <div
            vShow={true}
            style={{zIndex: this.zIndex}}
            class={bem()}
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
</style>
