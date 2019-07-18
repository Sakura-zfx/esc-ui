import { Vue, Component, Watch, Prop, Model } from 'vue-property-decorator'
import context from './context'
import { showLayer, closeLayer } from './mask-layer'

@Component
export default class Popup extends Vue {
  containerElement: Node | null = null

  @Model('input', { type: Boolean, default: false }) readonly show!: boolean
  @Prop(String) readonly container!: string
  @Prop({ type: Boolean, default: false }) readonly isLayerTransparent!: boolean
  @Prop({ type: Boolean, default: false }) readonly closeOnClickLayer!: boolean

  // @Watch('container')
  // onContainerChange(): void {
  //   this.openSelfAndLayer()
  // }
  @Watch('show')
  onVisibleChange (val: boolean): void {
    if (val) {
      this.openSelfAndLayer()
    } else {
      closeLayer(this)
    }
  }

  mounted () {
    if (this.show) {
      this.openSelfAndLayer()
    }
  }

  initContainer () {
    if (this.container) {
      this.containerElement = document.querySelector(this.container)
    } else if (this.$parent) {
      this.containerElement = this.$parent.$el
    } else {
      this.containerElement = document.body
    }
  }

  openSelfAndLayer () {
    this.initContainer()
    showLayer(this, {
      zIndex: context.index++,
      isTransparent: this.isLayerTransparent,
      containerElement: <Node> this.containerElement
    })
    this.showSelf()
  }

  close () {
    this.$emit('input', false)
  }

  showSelf () {
    // @ts-ignore
    this.$el.style.zIndex = context.index++
    (<Node> this.containerElement).appendChild(this.$el)
  }
}
