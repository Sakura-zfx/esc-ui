import { Vue, Component, Watch, Prop, Model } from 'vue-property-decorator'
import { VNode } from 'vue/types'
import EscMask from '../../mask-layer/index.vue'
import context from './context'

interface layerVNode extends VNode{
  visible: boolean,
  $el: Node
}

let layerInstance: layerVNode
const layerInstanceInit = (): void => {
  const MaskConstructor = Vue.extend(EscMask)
  layerInstance = new MaskConstructor({
    el: document.createElement('div')
  })
}

@Component
export default class Popup extends Vue {
  containerElement: Node = document.body

  @Prop() readonly container!: string
  @Prop() readonly isLayerTransparent!: boolean

  @Model('input') readonly show!: boolean

  @Watch('container')
  onContainerChange(): void {
    this.initContainer()
    this.openSelfAndLayer()
  }

  @Watch('show')
  onVisibleChange(val: boolean): void {
    if (val) {
      this.openSelfAndLayer()
    }
  }

  // mounted() {
  //   if (this.show) {
  //     this.openSelfAndLayer()
  //   }
  // }

  initContainer() {
    if (this.container) {
      this.containerElement = document.querySelector(this.container) || document.body
    }
  }

  openSelfAndLayer() {
    this.showLayer()
    // @ts-ignore
    this.$el.style.zIndex = context.index++
    this.containerElement.appendChild(this.$el)
  }

  close() {
    // this.show = false
    this.$emit('input', false)
    layerInstance.visible = false
  }

  showLayer() {
    if (!layerInstance) {
      layerInstanceInit()
    }
    Object.assign(layerInstance, {
      zIndex: context.index++,
      visible: true,
      isTransparent: this.isLayerTransparent
    })
    this.containerElement.appendChild(layerInstance.$el)
  }
}
