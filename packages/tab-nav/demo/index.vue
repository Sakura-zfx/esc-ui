<template>
  <div style="padding: 10px 0">
    <tab-nav
      v-model="active"
      :items="list"
      :border="true"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import TabNav from '../'

Vue.use(TabNav)

export default {
  name: 'DemoTabNav',

  components: {
    // TabNav
  },

  data () {
    return {
      active: 0,
      list: [
        {
          name: '首页',
          icon: 'https://i.loli.net/2019/07/09/5d24844e099a890696.jpg',
          iconSelected: 'https://i.loli.net/2019/07/09/5d24844e1d6f977943.jpg'
        },
        { name: '购物车', info: 5, to: 'https://www.baidu.com' },
        { name: '个人中心', info: '99+' }
      ]
    }
  },

  watch: {
    active (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="stylus">
@import '../index.styl'
</style>
