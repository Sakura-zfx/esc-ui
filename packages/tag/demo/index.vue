<template>
  <demo-wrap name="tag">
    <div style="padding: 10px">
      <p>默认大小</p>
      <tag>已取消</tag>
      <tag type="success">
        已完成
      </tag>
      <tag type="danger">
        赠品
      </tag>
      <tag type="info">
        进行中
      </tag>
      <p>加大尺寸</p>
      <tag
        size="large"
        type="success"
      >
        已完成
      </tag>
      <p>自定义颜色</p>
      <tag :color="['#333', '#fff']">
        纯甄极品
      </tag>
    </div>
  </demo-wrap>
</template>

<script>
import DemoWrap from '@/components/DemoWrap.vue'
import Tag from '../'

export default {
  name: 'DemoTag',
  components: {
    DemoWrap,
    Tag
  }
}
</script>
<style lang="stylus">
@import '../index.styl'
</style>
