<template>
  <demo-wrap name="avatar">
    <p>基础例子</p>
    <avatar
      name="杨明"
      uid="1"
    />
    <p>设置默认头像</p>
    <avatar
      uid="2"
      default-url="https://global.uban360.com/sfs/file?digest=fid961172950d4ec373a81fcda8e33f96e2&fileType=2"
    />
    <p>头像圆角</p>
    <avatar
      name="杨明"
      uid="1"
      round
    />
    <p>设置头像尺寸</p>
    <avatar
      name="杨明"
      uid="1"
      size="30px"
    />
    <p>设置头像圆角尺寸</p>
    <avatar
      name="杨明"
      uid="1"
      radius="10px"
    />
  </demo-wrap>
</template>

<script>
import DemoWrap from '@/components/DemoWrap.vue'
import Avatar from '../'

export default {
  name: 'DemoAvatar',
  components: {
    DemoWrap,
    Avatar
  }
}
</script>
<style lang="stylus">
@import '../index.styl'
</style>
