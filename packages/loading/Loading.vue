<template>
  <div
    v-show="value"
    :class="bem()"
    :style="loadingStyle"
  >
    <svg class="circular" viewBox="25 25 50 50">
      <circle
        :style="loadingPathStyle"
        class="path"
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

type LoadingColor = 'black' | 'white'

@Component({
  methods: {
    bem
  }
})
export default class Loading extends Vue {
  // show: boolean = true
  // @Prop({ default: 'normal' }) readonly type!: string
  @Prop({ default: false }) readonly value!: boolean
  @Prop({ default: 'black' }) readonly color!: LoadingColor

  get loadingStyle() {
    // const size = this.type === 'normal' ? 60 : 30
    const backgroundColor = this.color === 'black' ? undefined : 'rgba(0,0,0,.5)'
    return {
      // width: `${size}px`,
      // height: `${size}px`,
      backgroundColor
    }
  }

  get loadingPathStyle() {
    return {
      stroke: this.color === 'black' ? '#aaa' : '#fff'
    }
  }
}
</script>

<style lang="stylus">
.esc-loading
  display flex
  align-items center
  justify-content center
  flex-direction column
  border-radius 3px
  width 60px
  height 60px
  &__text
    font-size 12px
    color #fff
  .circular
    width 32px
    height 32px
    animation loading-rotate 2s linear infinite
  .path
    animation loading-dash 1.5s ease-in-out infinite
    stroke-dasharray 90,150
    stroke-dashoffset 0
    stroke-width 2
    // stroke #fff
    stroke-linecap round

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
