import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import EscMask from '../../mask-layer/index.vue'

interface MaskOptions {
  container?: string
}

let instance: Vue
const instanceInit = (): void => {
  const MaskConstructor = Vue.extend(EscMask)
  instance = new MaskConstructor({
    el: document.createElement('div')
  })
}

@Component({

})
export default class Popup extends Vue {
  @Prop() readonly container!: string

  @Watch('container')
  onContainerChange(val: string, oldVal: string): void {
    // console.log(val)
    // this.showMask({ container: val })
    this.open()
  }

  mounted() {
  }

  open() {

  }

  showMask(options: MaskOptions) {
    if (!instance) {
      instanceInit()
    }
    if (options.container) {
      // @ts-ignore
      document.querySelector(options.container).appendChild(instance.$el)
    } else {
      document.body.appendChild(instance.$el)
    }
  }
}
