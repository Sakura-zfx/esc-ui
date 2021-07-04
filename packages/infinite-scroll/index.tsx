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
  showEmpty = false
  noData = false

  @Prop({ type: Boolean, default: true }) readonly windowScroll!: boolean
  @Prop({ type: Number }) readonly topHideSize!: number
  @Prop({ type: Number, default: 0 }) readonly bottomThrottle!: number
  @Prop({ type: Boolean, default: true }) readonly loadFirst!: boolean
  @Prop({ type: Function, required: true }) readonly loadFun!: () => Promise<any[]>
  @Prop({ type: String, default: 'id' }) readonly keyName!: string
  @Prop({ type: Number }) readonly count!: number

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

    const container = this.windowScroll ? (document.documentElement || document.body) : (this.$refs.container as HTMLDivElement)
    this.containerHeight = container.clientHeight || container.offsetHeight
    this.addDocumentListener()
  }

  beforeDestroy () {
    this.addDocumentListener(false)
  }

  spliceList (
    oldItem: any,
    newItem?: any
  ) {
    if (oldItem[this.keyName] === undefined) {
      return
    }
    const index = this.list.findIndex(x => x[this.keyName] === oldItem[this.keyName])
    if (index > -1) {
      newItem
        // @ts-ignore
        ? this.list.splice(index, 1, newItem)
        : this.list.splice(index, 1)
    }
  }

  load () {
    this.loading = true
    this.loadFun().then((res: any) => {
      this.list = this.list.concat(res)
      this.loading = false
      // 没有更多
      if (isDef(this.count)) {
        this.noData = this.list.length >= this.count
      } else {
        this.noData = res.length === 0
      }
      // 无数据
      if (this.list.length === 0) {
        this.showEmpty = true
      }
    }).catch(() => {
      this.loading = false
    })
  }

  reset () {
    this.list = []
    this.showEmpty = false
    this.noData = false
  }

  addDocumentListener (type: boolean = true) {
    const handle = this.windowScroll ? window : (this.$refs.container as HTMLDivElement)
    handle[type ? 'addEventListener' : 'removeEventListener']('scroll', this.scrollCallback, { passive: true })
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

    if (!this.loading && !this.noData) {
      const handle = this.windowScroll
        ? (this.$refs.container as HTMLDivElement)
        : (this.$refs.wrap as HTMLDivElement)
      const wrapHeight = handle ? handle.offsetHeight : 0

      if (
        wrapHeight !== 0 &&
        this.containerHeight + top + this.bottomThrottle >= wrapHeight
      ) {
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
    const genEmpty = () => this.$slots.empty || <p class={bem('empty', false)}>暂无数据~</p>
    const genNoData = () => <p class={bem('empty', false)}>没有更多了~</p>
    const result = this.list.map((item: any, i: number) => genItem(item[this.keyName] || i, item))
      .concat(genLoading())

    if (this.showEmpty) {
      return result.concat(genEmpty())
    } else if (this.noData) {
      return result.concat(genNoData())
    }
    return result
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
    let translateY: string = isDef(this.topHideSize)
      ? `${Math.min.call(null, this.topHideSize, this.topHeight) * dir}px`
      : `${dir * 100}%`
    const isWx = /microMessenger|alipay/i.test(navigator.userAgent)
    // 在微信中，由于存在“橡皮筋”效果，会导致 top 栏错位
    if (isWx) {
      translateY = '0'
    }
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
