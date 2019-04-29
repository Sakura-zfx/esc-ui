import { Vue, Component, Prop } from 'vue-property-decorator'
import { use, isDef } from '../utils'

const [ bem ] = use('infinite-scroll')

@Component
export default class InfiniteScroll extends Vue {
  list = []
  topHeight: number = 0
  lastScrollTop: number = 0
  // pit 设置为 undefined 是不会被初始化的
  dir: string = ''
  containerHeight: number = 0
  loading: boolean = false

  @Prop({ type: Boolean, default: true }) readonly windowScroll!: boolean
  @Prop({ type: Number }) readonly topHideSize!: number
  @Prop({ type: Number, default: 0 }) readonly bottomThrottle!: number
  @Prop({ type: Boolean, default: true }) readonly loadFirst!: boolean
  @Prop({ type: Function, required: true }) readonly loadFun!: () => Promise<any[]>

  get hasTop (): boolean {
    return this.windowScroll && !!this.$slots.top
  }

  async created () {
    if (this.loadFirst) {
      this.load()
    }
  }

  mounted () {
    if (this.hasTop) {
      this.topHeight = (this.$refs.top as HTMLDivElement).offsetHeight
    }

    this.containerHeight = this.windowScroll
      ? document.documentElement.clientHeight || document.body.clientHeight
      : (this.$refs.container as HTMLDivElement).offsetHeight
    this.addDocumentListener()
  }

  load () {
    this.loading = true
    this.loadFun().then((res: any) => {
      this.list = this.list.concat(res)
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
  }

  addDocumentListener () {
    const handle = this.windowScroll ? window : (this.$refs.container as HTMLDivElement)
    handle.addEventListener('scroll', this.scrollCallback, { passive: true })
  }

  scrollCallback (e: Event) {
    const top = this.windowScroll
      ? document.documentElement.scrollTop || document.body.scrollTop
      : (e.target as Element).scrollTop
    const diff = top - this.lastScrollTop

    if (this.hasTop && Math.abs(diff) >= this.topHeight) {
      this.lastScrollTop = top
      this.dir = diff > 0 ? 'down' : 'up'
    }

    if (!this.loading) {
      const wrapHeight = this.windowScroll
        ? (this.$refs.container as HTMLDivElement).offsetHeight
        : (this.$refs.wrap as HTMLDivElement).offsetHeight

      if (this.containerHeight + top + this.bottomThrottle >= wrapHeight) {
        this.load()
      }
    }
  }

  renderItem () {
    const genItem = (key: string | number, item: any) => (
      <div
        key={key}
        class={bem('item', false)}
      >
        {this.$scopedSlots.default && this.$scopedSlots.default(item)}
      </div>
    )
    const genLoading = () => (
      <div
        vShow={this.loading}
        class={bem('loading', false)}
      >
        {'加载中...'}
      </div>
    )
    return this.list.map((item: any, i: number) => genItem(item.id || i, item)).concat(genLoading())
  }

  renderWrapItem () {
    return (
      <div
        ref="wrap"
        class={bem('wrap', false)}
      >
        {this.renderItem()}
      </div>
    )
  }

  renderTop () {
    const dir = this.dir === 'down' ? -1 : 0
    const translateY = isDef(this.topHideSize)
      ? `${Math.min.call(null, this.topHideSize, this.topHeight) * dir}px`
      : `${dir * 100}%`
    return (
      <div
        ref="top"
        class={bem('top', false)}
        style={{ transform: `translateY(${translateY})` }}
      >
        {this.$slots.top}
      </div>
    )
  }

  render () {
    const sty = this.windowScroll ? { paddingTop: `${this.topHeight}px` } : null
    return (
      <div
        class={bem()}
        ref="container"
        style={sty}
      >
        {this.hasTop && this.renderTop()}
        {this.windowScroll ? this.renderItem() : this.renderWrapItem()}
      </div>
    )
  }
}
