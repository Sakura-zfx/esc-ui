<template>
  <div v-show="show" class="esc-loading__service">
    <loading :value="true" color="white" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import Loading from './Loading.vue'
import Popup from '@@/mixins/popup'

@Component({
  components: {
    Loading
  }
})
export default class LoadingService extends Mixins(Popup) {
  open() {
    this.$emit('input', true)
  }
}
</script>

<style lang="stylus">
.esc-loading__service
  position fixed
  left 50%
  top 50%
  transform translate(-50%, -50%)
</style>
