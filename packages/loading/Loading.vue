<template>
  <div
    v-show="value"
    :class="loadingClass"
  >
    <svg :class="bem('circular')" viewBox="25 25 50 50">
      <circle
        :class="pathClass"
        cx="50"
        cy="50"
        r="20"
        fill="none"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Bem from '@@/utils/bem'
const bem = Bem('loading')

import { LoadingColor, LoadingSize } from 'types/loading'

@Component({
  methods: {
    bem
  }
})
export default class Loading extends Vue {
  @Prop({ default: false, type: Boolean }) readonly value!: boolean
  @Prop({ default: 'default', type: String }) readonly size!: LoadingSize
  @Prop({ default: 'black', type: String }) readonly color!: LoadingColor

  get isWhiteLoading() {
    return this.color === 'white'
  }

  get loadingClass() {
    return {
      [bem()]: true,
      [bem('white')]: this.isWhiteLoading,
      [bem(this.size)]: true
    }
  }

  get pathClass() {
    return {
      [bem('path')]: true,
      [bem('path', 'white')]: this.isWhiteLoading,
      [bem('path', 'black')]: !this.isWhiteLoading
    }
  }
}
</script>

<style lang="stylus">
@import '../style/var.styl'

.esc-loading
  display flex
  align-items center
  justify-content center
  flex-direction column
  border-radius 3px

  &__white
    background-color loading-white-background-color

  &__default
    width 32px
    height 32px
    &^[0]__white
      width 60px
      height 60px
      padding 14px
  &__small
    width 20px
    height 20px

  &__text
    font-size 12px
    color #fff

  &__circular
    width 100%
    height 100%
    animation loading-rotate 2s linear infinite

  &__path
    animation loading-dash 1.5s ease-in-out infinite
    stroke-dasharray 90, 150
    stroke-dashoffset 0
    stroke-width 2
    stroke-linecap round
    &--black
      stroke loading-black-path-stroke
    &--white
      stroke white

  @keyframes loading-rotate
    100%
      transform rotate(360deg)
  @keyframes loading-dash
    0%
      stroke-dasharray 1,200
      stroke-dashoffset 0
    50%
      stroke-dasharray 90,150
      stroke-dashoffset -40px
    100%
      stroke-dasharray 90,150
      stroke-dashoffset -120px
</style>
