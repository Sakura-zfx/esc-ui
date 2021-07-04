<template>
  <demo-wrap name="skeleton">
    <div style="height: 100vh;background-color: #fff; margin: -10px">
      <skeleton
        has-block
      />
      <skeleton
        :rows="['100%', 10, 200]"
      />
    </div>
  </demo-wrap>
</template>

<script>
import DemoWrap from '@/components/DemoWrap.vue'
import Skeleton from '../'

export default {
  name: 'DemoSkeleton',
  components: {
    DemoWrap,
    Skeleton
  }
}
</script>
<style lang="stylus">
@import '../index.styl'
</style>
