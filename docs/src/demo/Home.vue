<template>
  <div class="demo-home">
    <p class="demo-home-title">esc-ui 企业服务业务组件库</p>
    <div
      class="demo-home-list"
      v-for="(item, index) in routerDir"
      :key="item.title">
      <p class="demo-home-list-title" @click="toggleVisible(index)">{{ item.title }}</p>
      <div v-show="showIndex.indexOf(index) >= 0">
        <div
          class="demo-home-list-item"
          v-for="nav in item.items"
          :key="nav.title"
          @click="toUrl(nav.name)">
          {{ nav.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { routerDir, PackageItemGroup } from '../constant'

@Component({})

export default class HomeDemo extends Vue {
  routerDir: PackageItemGroup[] = routerDir
  showIndex: number[] = []

  toggleVisible (index: number): void {
    const position = this.showIndex.indexOf(index)
    if ( position >= 0) {
      this.showIndex.splice(position, 1)
      return
    }
    this.showIndex.push(index)
  }

  toUrl (name: string): void {
    parent.window.location.href = parent.window.location.origin + '#/' + name
  }
}
</script>

<style lang="stylus">
  .demo-home
    padding 15px 20px
    &-list
      user-select none
      background-color #fff
      margin-bottom 20px
      border-radius 3px
      &-title
        font-size 16px
        padding 15px 20px
        margin 0
      &-item
        font-size 14px
        margin-left 20px
        padding 10px 0
        border-top solid 1px #ebedf0
</style>
