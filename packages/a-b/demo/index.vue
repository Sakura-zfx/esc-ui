<template>
  <demo-wrap name="a-b">
    <a-b />
  </demo-wrap>
</template>

<script>
import DemoWrap from '@/components/DemoWrap.vue'
import AB from '../'

export default {
  name: 'DemoAB',
  components: {
    DemoWrap,
    AB
  }
}
</script>
<style lang="stylus">
@import '../index.styl'
</style>
