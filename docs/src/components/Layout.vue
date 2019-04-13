<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator'
// import Bem from '../../../packages/utils/bem'
import NavItems from '../components/NavItems.vue'
import { PackageItemGroup, PackageItem, routerDir } from '../constant'
import { use } from '@@/utils'

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
  docScrollTop: number = 0

  get isScrollOut(): boolean {
    return this.docScrollTop > 40
  }

  created() {
    this.demoSrc = `./demo.html#${this.$route.path}`
  }

  mounted() {
    window.onscroll = () => {
      this.docScrollTop = document.documentElement.scrollTop
    }
  }

  navChange(nav: PackageItem) {
    this.demoSrc = `./demo.html#/${nav.name}`
  }

  render () {
    const [ bem ] = use('layout')

    return (
      <div class={bem()}>
        <div class={bem('top', false)}>
          <div class={bem('top', 'content', false)}>
            <a class={bem('top', 'title', false)} href="">
              <img src={require('../assets/logo.png')} width="40px" alt="" />
              <div>
                <span>{'Esc-ui'}</span>
                <span class={bem('top', 'content-small', false)}> 企业服务业务组件库</span>
              </div>
            </a>
            <ul>
              <li><a target="_blank" href="https://github.com/Jmingzi/esc-ui">github</a></li>
            </ul>
          </div>
        </div>
        <div class={(this.isScrollOut ? bem('left', 'sticky') : bem('left', false))}>
          <nav-items list={this.navItems} onChange={this.navChange} />
        </div>
        <div class={bem('center', false)}>
          <div class="van-doc-content">{this.$slots.center}</div>
        </div>
        <div class={(this.isScrollOut ? bem('right', 'sticky') : bem('right', false))}>
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
        justify-content space-between
        align-items center
        height 100%
        margin 0 auto
        padding 0 40px
        @media (min-width 1440px)
          width 1440px
        div
          margin-left 10px
        &-small
          font-size 12px
          color #999
      &--title
        display flex
        // width 200px
        // line-height 60px
        align-items center
        font-size 24px
        text-decoration none
        color #333
      ul a
        font-size 12px
        color #333
        text-decoration underline
    &__left
      position absolute
      top 60px
      bottom 0
      width 240px
      border-right: 1px solid #f1f4f8
      overflow-y: scroll
      padding: 25px 0 75px
      z-index 1
      @media (min-width 1440px)
        margin-left -720px
        left 50%
      &--sticky
        position fixed
        top 0

    &__center
      padding-left 240px
      padding-right 360px
      margin 0 auto
      @media (min-width 1440px)
        width 1440px
        padding-right 400px

      section
        padding: 13px 40px
        overflow: hidden
    &__right
      z-index: 1
      overflow: hidden
      position: absolute
      border-radius: 6px
      background: #f2f3f5
      box-sizing: border-box
      height 640px
      width 320px
      top: 100px
      right 40px
      box-shadow: 0 1px 4px rgba(0,0,0,.2), 0 1px 2px rgba(0,0,0,.2)
      transform translate3d(0, 0, 0)
      @media (max-height 800px)
        height 500px
      @media (max-width 1100px)
        left 750px
      @media (min-width 1440px)
        right: 50%
        margin-right: -680px
        width: 360px
      &--sticky
        position fixed
        top 40px
        height 560px
</style>
