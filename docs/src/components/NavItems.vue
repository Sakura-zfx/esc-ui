<script lang="tsx">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import Bem from '../../../packages/utils/bem'
  import { PackageItemGroup, PackageItem } from '../constant'

  const bem = Bem('nav')

  @Component({})
  export default class NavItems extends Vue {
    @Prop() readonly list!: PackageItemGroup[]

    created () {
    }

    redirect (nav: PackageItem): void {
      this.$router.push(`/${nav.name}`)
    }

    render() {
      return (
        <div class={bem('wrap')}>{
          this.list.map(group => (
            <div class={bem('group')}>
              <div class={bem('group', 'title')}>{ group.title }</div>
              {
                group.items.map(nav => (
                  <div class={bem('item')} onClick={this.redirect.bind(this, nav)}>{ nav.title }</div>
                ))
              }
            </div>
          ))
        }</div>
      )
    }
  }
</script>

<style lang=stylus>
  .esc-nav
    &__group
      &--title
        font-size 16px
        color: #455a64
        line-height: 24px
        font-weight 700
        padding: 10px 20px 10px 0
    &__item
      font-size 14px
      color: #455a64
      padding: 10px 20px 10px 0
      line-height: 24px
</style>
