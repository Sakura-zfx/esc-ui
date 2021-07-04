import { Component, Vue, Prop } from 'vue-property-decorator'

interface TypeSlideDelete extends Vue {
  open: boolean
  draging: boolean
  offset: number
  threshold: number
  delAreaWidth: number
  getTouch(touch: TouchEvent): { clientX: number, clientY: number }
  setOpen(type: boolean): void
  closeOther(): void
  isAngleLeft(diffX: number, diffY: number): boolean
}

const COMPONENT_NAME = 'm-slide'

@Component({
  directives: {
    slide: {
      bind (el, binding, vNode) {
        let startX: number
        let startY: number
        let diffX: number
        let diffY: number
        let vm = (vNode.context as TypeSlideDelete)

        el.addEventListener('touchstart', e => {
          const { clientX, clientY } = vm.getTouch(e)
          startX = clientX
          startY = clientY
          vm.draging = true
        })

        el.addEventListener('touchmove', e => {
          const { clientX, clientY } = vm.getTouch(e)
          diffX = clientX - startX
          diffY = clientY - startY

          if (
            vm.isAngleLeft(diffX, diffY) &&
            Math.abs(diffX) <= vm.delAreaWidth &&
            (
              (diffX < 0 && !vm.open) ||
              (diffX > 0 && vm.open)
            )
          ) {
            e.preventDefault()
            vm.offset = vm.open ? diffX - vm.delAreaWidth : diffX
          }
        })

        el.addEventListener('touchend', e => {
          const { clientX, clientY } = vm.getTouch(e)
          diffX = clientX - startX
          diffY = clientY - startY
          vm.draging = false

          if (
            (diffX > 0 && diffX > vm.threshold) ||
            (diffX < 0 && diffX > -vm.threshold)
          ) {
            vm.open = false
            vm.offset = 0
          } else if (
            vm.isAngleLeft(diffX, diffY) &&
            (
              (diffX > 0 && diffX <= vm.threshold) ||
              (diffX < 0 && diffX <= -vm.threshold)
            )
          ) {
            vm.open = true
            vm.offset = -vm.delAreaWidth
            vm.closeOther()
            vm.$emit('open', vm)
          }
        })
      }
    }
  }
})
export default class SlideDelete extends Vue {
  delAreaWidth = 70
  open = false
  offset = 0
  draging = false

  @Prop({ type: Number, default: 35 }) readonly threshold!: number
  @Prop({ type: String, default: 'm-slide__del-red' }) readonly delCls!: string
  @Prop({ type: String, default: '删除' }) readonly delText!: string

  get wrapperStyle () {
    return {
      transform: `translate3d(${this.offset}px, 0, 0)`,
      transition: this.draging ? 'none' : '.6s cubic-bezier(0.18, 0.89, 0.32, 1)'
    }
  }

  getTouch (touch: TouchEvent) {
    return touch.changedTouches[0] || touch.targetTouches[0]
  }

  isAngleLeft (diffX: number, diffY: number) {
    const x = Math.abs(diffX)
    const y = Math.abs(diffY)
    return !(x < 5 || (x >= 5 && y >= x * 1.73))
  }

  setOpen (type = false) {
    this.open = type
    this.offset = type ? -this.delAreaWidth : 0
  }

  closeOther () {
    this.$parent.$children
      .filter((vNode: any) =>
        vNode.$el.classList.contains(COMPONENT_NAME) &&
        vNode.open &&
        vNode !== this
      )
      .forEach((vNode: any) => {
        vNode.setOpen(false)
      })
  }

  render () {
    return (
      <div class={COMPONENT_NAME} vSlide>
        <div class="m-slide__top" ref="slideItem" style={this.wrapperStyle}>
          {this.$slots.default}
        </div>
        <div class={`m-slide__del ${this.delCls}`} onClick={() => { this.$emit('del') }}>
          {this.$slots.del ? this.$slots.del : <span>{this.delText}</span>}
        </div>
      </div>
    )
  }
}
