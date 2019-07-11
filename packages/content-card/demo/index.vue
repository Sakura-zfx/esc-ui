<template>
  <div style="padding: 10px 0">
    <content-card
      img-src="https://i.loli.net/2019/07/11/5d26fdb64d85633722.jpg"
      :size="[70, 80]"
      :vertical-center="false"
      :custom-class="['aa']"
    >
      <template #centerTop>
        <span>虚拟网6送6</span>
      </template>
      <template #centerBottom>
        <span>到期时间：2018/01/03</span>
      </template>
      <template #right>
        <esc-button
          text="立即订购"
          size="small"
          type="primary"
        />
      </template>
    </content-card>
  </div>
</template>

<script>
import ContentCard from '../'
import EscButton from '../../button'

export default {
  components: {
    ContentCard,
    EscButton
  }
}
</script>

<style lang="stylus">
@import '../index.styl'
@import '../../button/index.styl'
</style>
