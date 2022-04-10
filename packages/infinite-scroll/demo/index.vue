<template>
  <infinite
    class="demo-infinite"
    :load-fun="fetch"
    :top-hide-size="30"
  >
    <div
      class="demo-infinite-top"
      slot="top"
    >
      <div>菜单一</div>
      <div>菜单二</div>
    </div>
    <div
      class="demo-infinite-top__item"
      slot-scope="props"
    >
      {{ props }}
    </div>
  </infinite>
</template>

<script>
// import DemoWrap from '@/components/DemoWrap.vue'
import Infinite from '../index.tsx'

export default {
  name: 'Index',

  components: {
    // DemoWrap,
    Infinite
  },

  data () {
    return {
      num: 0
    }
  },

  methods: {
    fetch () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.num === 2) {
            console.log('null')
            resolve([])
            return
          }
          this.num += 1
          resolve(Array.from(new Array(20)).fill(1))
        }, 2000)
      })
    }
  }
}
</script>

<style lang="stylus">
@import '../../style/base.styl'
@import '../index.styl'

.demo-infinite
  // position absolute
  // top 100px
  // bottom 0
  // width 100%
  // overflow auto
.demo-infinite-top
  display flex
  height 50px
  justify-content space-between
  align-items center
  border-bottom 1px #eee solid
  div
    width 50%
    text-align center
  &__item
    background-color #ffffff
    line-height 50px
    border-bottom 1px #eee solid
    text-align center
</style>
