<template>
  <button
    :class="buttonClass"
    :style="hackButtonStyle"
    @click="onClick"
  >
    <div :class="bem('loading')" v-if="loading">
      <loading size="small" :value="loading" />
      <span v-if="loadingText">{{ loadingText }}</span>
    </div>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Loading from '../loading/Loading.vue'
import Bem from '@@/utils/bem'

type propType = 'default' | 'primary'
type propSize = 'large' | 'normal' | 'small' | 'mini'

const bem = Bem('button')
@Component({
  components: {
    Loading
  },
  methods: {
    bem
  }
})
export default class EscButton extends Vue {
  // pit 类型要写2遍
  @Prop({ default: 'default', type: String }) readonly type!: propType
  @Prop({ default: 'normal', type: String }) readonly size!: propSize
  @Prop(String) readonly text!: string
  @Prop(String) readonly loadingText!: string
  @Prop({ default: false, type: Boolean }) readonly round!: boolean
  @Prop({ default: false, type: Boolean }) readonly square!: boolean
  @Prop({ default: false, type: Boolean }) readonly plain!: boolean
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
  @Prop({ default: false, type: Boolean }) readonly loading!: boolean
  @Prop({ default: false, type: Boolean }) readonly block!: boolean
  @Prop({ default: false, type: Boolean }) readonly replace!: boolean
  @Prop(Number) readonly radius?: number
  @Prop(String) readonly color?: string
  @Prop(String) readonly url?: string

  get buttonClass() {
    return {
      [bem()]: true,
      [bem(this.type)]: true,
      [bem(this.size)]: true,
      [bem('round')]: this.round,
      [bem('square')]: this.square,
      [bem('plain')]: this.plain,
      [bem('disabled')]: this.disabled,
      [bem('block')]: this.block
    }
  }

  get hackButtonStyle() {
    const color: string[] = [this.color, '#fff']
    const getColor = (isColor?: boolean): string => color[isColor ? Number(!this.plain) : Number(this.plain)]
    return {
      borderRadius: this.radius && `${this.radius}px`,
      backgroundColor: this.color && getColor(false),
      color: this.color && getColor(true),
      borderColor: this.color && this.color
    }
  }

  onClick(): void {
    if (!this.loading && !this.disabled) {
      this.$emit('on-click')
      this.routeRedirect()
    }
  }

  routeRedirect() {
    if (/^https?/.test(this.url)) {
      this.replace ? location.replace(this.url) : (location.href = this.url)
    } else if (/^\/[a-z]*/.test(this.url)) {
      this.$router[this.replace ? 'replace' : 'push'](this.url)
    }
  }
}
</script>

<style lang="stylus">
@import '../style/var.styl'
.esc-button
  position relative
  display inline-block
  padding 0
  text-align: center
  box-sizing: border-box
  -webkit-appearance: none
  -webkit-text-size-adjust: 100%
  border-radius 2px
  border-width 1px
  border-style solid
  &:focus
    outline none
  &::before
    content: ' '
    position: absolute
    top: 50%
    left: 50%
    opacity: 0
    width: 100%
    height: 100%
    border: inherit
    border-color: black
    background-color: black
    border-radius: inherit
    transform: translate(-50%, -50%)
  &:active::before
    opacity: .1

  &__default
    color button-default-color
    background-color button-default-background-color
    border-color button-default-border-color
  &__primary
    color button-primary-color
    background-color button-primary-background-color
    border-color button-primary-border-color
    &^[0]__plain
      color button-primary-background-color

  &__large
    font-size 16px
    height 50px
    line-height 48px
    padding 0 20px
  &__normal
    font-size 14px
    height 44px
    line-height 42px
    padding 0 15px
  &__small
    font-size 12px
    height 30px
    line-height 28px
    padding 0 8px
  &__mini
    min-width 50px
    font-size 10px
    height 22px
    line-height 20px

  &__plain
    background-color button-plain-background-color
  &__round
    border-radius button-round
  &__square
    border-radius 0
  &__disabled
    opacity button-disabled-opacity
  &__block
    display block
    width 100%
  &__loading
    .esc-loading
      display inline-block
      vertical-align middle
      font-size 0
    span
      margin-left 5px
      display inline-block
      vertical-align middle
</style>
