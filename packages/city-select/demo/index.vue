<template>
  <demo-wrap name="city-select">
    <p class="plr10">
      基础用法
    </p>
    <city-select
      color="blue"
      @click-item="handleClickItem"
      :load="load"
      style="height: 250px"
    />
    <p class="plr10">
      结合 popup 一起使用
    </p>
    <Button
      type="primary"
      @click="showPopup = true"
    >
      选择地址
    </Button>
    <p>选择结果：{{ selected }}</p>

    <Popup
      position="bottom"
      close-on-click-layer
      v-model="showPopup"
    >
      <span slot="title-center">选择地址</span>
      <city-select
        :load="load"
        @input="handleEnd"
        @click-item="handleClickItem"
      />
    </Popup>
  </demo-wrap>
</template>

<script>
import DemoWrap from '@/components/DemoWrap.vue'
import CitySelect from '../'
import Popup from '../../popup'
import Button from '../../button'

export default {
  name: 'DemoCitySelect',
  components: {
    DemoWrap,
    CitySelect,
    Popup,
    Button
  },
  data () {
    return {
      showPopup: false,
      selected: []
    }
  },
  methods: {
    load (level, selected) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (level === 0) {
            resolve([{ name: '中国', code: 0 }])
          } else if (level === 1) {
            resolve([
              { name: '浙江', code: 1 },
              { name: '湖北', code: 2 },
              { name: '湖南', code: 3 },
              { name: '海南', code: 4 },
              { name: '北京', code: 5 },
              { name: '天津', code: 6 },
              { name: '重庆', code: 7 },
              { name: '河南', code: 8 }
            ])
          } else if (level === 2) {
            resolve([{ name: '杭州', code: 1 }, { name: '绍兴', code: 2 }])
          } else {
            resolve()
          }
        }, 1000)
      })
    },

    handleEnd (arr) {
      this.selected = arr
      this.showPopup = false
    },

    handleClickItem (item, level) {
      console.log(item, level)
    }
  }
}
</script>
<style lang="stylus">
@import '../index.styl'
@import '../../button/index.styl'
@import '../../popup/index.styl'
@import '~@@/mask-layer/index.styl'
</style>
