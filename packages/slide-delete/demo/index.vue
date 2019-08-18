<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import EscDel from '@@/slide-delete/index.tsx'
import DemoWrap from '@/components/DemoWrap.vue'

@Component({
  components: {
    EscDel,
    DemoWrap
  }
})
export default class DemoDelete extends Vue {
  name = 'index'

  isMobile = /iphone|android/i.test(navigator.userAgent)

  list = new Array(10).fill(1)

  render () {
    return (
      <demo-wrap name="slide-delete" no-padding>
        {
          this.isMobile ? this.list.map((item: number, i: number) => (
            <esc-del>
              <div class="demo-slide-delete">左滑删除{ i + 1 }</div>
              <span slot="del">删除吗</span>
            </esc-del>
          )) : <div style="text-align: center;padding-top: 50px">
            <img src={require('./1566120808.png')} alt=""/>
            <p>扫码真机预览</p>
          </div>
        }
      </demo-wrap>
    )
  }
}
</script>

<style lang="stylus">
@import '../index.styl'

.demo-slide-delete
  text-align center
  line-height 50px
  border-bottom 1px #eee solid
</style>
