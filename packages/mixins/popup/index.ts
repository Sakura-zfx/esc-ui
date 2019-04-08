import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import EscMask from '../../mask-layer/index.vue'
import context from './context'

interface MaskOptions {
  container?: string
}

let layerInstance: Vue
const layerInstanceInit = (): void => {
  const MaskConstructor = Vue.extend(EscMask)
  layerInstance = new MaskConstructor({
    el: document.createElement('div')
  })
}

@Component({

})
export default class Popup extends Vue {
  containerElement: HTMLElement | HTMLBodyElement = document.body

  @Prop() readonly container!: string

  @Watch('container')
  onContainerChange(val: string, oldVal: string): void {
    this.initContainer()
    this.open()
  }

  mounted() {
  }

  initContainer() {
    if (this.container) {
      this.containerElement = document.querySelector(this.container) || document.body
    }
  }

  open() {
    this.showLayer({})
    // @ts-ignore
    this.$el.style.zIndex = context.index++
    this.containerElement.appendChild(this.$el)
  }

  showLayer(options: MaskOptions) {
    if (!layerInstance) {
      layerInstanceInit()
    }
    Object.assign(layerInstance, options, {
      zIndex: context.index++
    })
    this.containerElement.appendChild(layerInstance.$el)
  }
}
