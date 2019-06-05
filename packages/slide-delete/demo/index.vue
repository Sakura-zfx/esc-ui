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
          this.isMobile ? null : (
            <p>此处未兼容mouse事件，请使用chrome 模拟器查看，
              <a href="./demo.html#/slide-delete" target="_blank">点击打开</a>
            </p>
          )
        }
        {
          this.list.map((item: number, i: number) => (
            <esc-del>
              <div class="demo-slide-delete">左滑删除{ i + 1 }</div>
              <span slot="del">删除吗</span>
            </esc-del>
          ))
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
