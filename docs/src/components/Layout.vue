<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
import Bem from '../../../packages/utils/bem'
import NavItems from '../components/NavItems.vue'
import { PackageItemGroup, PackageItem, routerDir } from '../constant'

const bem = Bem('layout')

@Component({
  components: {
    // pit 如果使用 tsx，必须使用小写
    // 反之使用 template 必须使用 大写
    // https://github.com/vuejs/vue-cli/issues/2417#issuecomment-419667646
    'nav-items': NavItems
  }
})
export default class Layout extends Vue {
  navItems: PackageItemGroup[] = routerDir
  demoSrc: string = ''

  created() {
    this.demoSrc = `./demo.html#${this.$route.path}`
  }

  navChange(nav: PackageItem) {
    this.demoSrc = `./demo.html#/${nav.name}`
  }

  render () {
    return (
      <div class={bem()}>
        <div class={bem('top')}>
          <div class={bem('top', 'content')}>
            <a href="">
              <span>{ 'Esc-ui' }</span>
              <span class={bem('top', 'content-small')}> 企业服务业务组件库</span>
            </a>
          </div>
        </div>
        <div class={bem('left')}>
          <nav-items list={this.navItems} onChange={this.navChange} />
        </div>
        <div class={'van-doc-content ' + bem('center')}>{this.$slots.center}</div>
        <div class={bem('right')}>
          <iframe slot="right" src={this.demoSrc} frameBorder="0"/>
        </div>
      </div>
    )
  }
}
</script>

<style lang="stylus">
  .esc-layout
    &__top
      height 60px
      border-bottom 1px #eee solid
      &--content
        display flex
        width 1440px
        height 100%
        margin 0 auto
        padding 0 40px
        a
          display block
          width 200px
          line-height 60px
          font-size 20px
          text-decoration none
          color #333
        &-small
          font-size 12px
          color #999
    &__left
      position fixed
      left 50%
      margin-left -720px
      top 60px
      bottom 0
      width 240px
      border-right: 1px solid #f1f4f8
      overflow-y: scroll
      padding: 25px 0 75px
      z-index 1
    &__center
      padding-left 240px !important
      padding-right 400px !important
      width 1440px
      margin 0 auto
      section
        padding: 13px 40px
        overflow: hidden
    &__right
      z-index: 1
      overflow: hidden
      position: fixed
      border-radius: 6px
      background: #fafafa
      box-sizing: border-box
      /*right: 40px*/
      width: 360px
      height 640px
      min-width: 360px
      top: 100px
      box-shadow: 0 1px 4px rgba(0,0,0,.2), 0 1px 2px rgba(0,0,0,.2)
      right: 50%
      margin-right: -680px
      transform translate3d(0, 0, 0)
</style>
