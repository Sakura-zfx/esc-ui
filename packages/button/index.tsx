import { Component, Prop, Vue } from 'vue-property-decorator'
import Loading from '../loading/loading'
import { use } from '../utils'

type propType = 'default' | 'primary'
type propSize = 'large' | 'normal' | 'small' | 'mini'
// 此处并没有起到提示的效果
interface EscButtonProps {
  type: string
  size: string
  text?: string
}

const [ bem ] = use('button')

@Component({
  components: {
    'esc-loading': Loading
  }
})
export default class EscButton extends Vue implements EscButtonProps {
  // pit 类型要写2遍
  @Prop({ default: 'default', type: String }) readonly type!: propType
  @Prop({ default: 'normal', type: String }) readonly size!: propSize
  @Prop(String) readonly text!: string
  @Prop(String) readonly loadingText!: string
  @Prop({ default: false, type: Boolean }) readonly round!: boolean
  @Prop({ default: false, type: Boolean }) readonly square!: boolean
  @Prop({ default: false, type: Boolean }) readonly plain!: boolean
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
  @Prop({ default: false, type: Boolean }) readonly disabledGray!: boolean
  @Prop({ default: false, type: Boolean }) readonly loading!: boolean
  @Prop({ default: false, type: Boolean }) readonly block!: boolean
  @Prop({ default: false, type: Boolean }) readonly replace!: boolean
  @Prop(Number) readonly radius!: number
  @Prop(String) readonly color!: string
  @Prop(String) readonly url!: string

  get buttonClass () {
    return bem([
      this.type,
      this.size,
      {
        round: this.round,
        square: this.square,
        plain: this.plain,
        disabled: this.disabled || this.disabledGray,
        block: this.block,
        'disabled-gray': this.disabledGray
      }
    ])
  }

  get hackButtonStyle () {
    const color: string[] = [this.color, '#fff']
    const getColor = (isColor?: boolean): string => color[isColor ? Number(!this.plain) : Number(this.plain)]
    return {
      borderRadius: this.radius && `${this.radius}px`,
      backgroundColor: this.color && getColor(false),
      color: this.color && getColor(true),
      borderColor: this.color && this.color
    }
  }

  onClick (): void {
    if (!this.loading && !this.disabled && !this.disabledGray) {
      this.$emit('on-click')
      this.routeRedirect()
    }
  }

  routeRedirect () {
    if (/^https?/.test(this.url)) {
      this.replace ? location.replace(this.url) : (location.href = this.url)
    } else if (/^\/[a-z]*/.test(this.url)) {
      // @ts-ignore
      this.$router[this.replace ? 'replace' : 'push'](this.url)
    }
  }

  renderLoading () {
    return (
      <div class={bem('loading', false)}>
        <esc-loading size="small" value={this.loading} />
        {this.loadingText && <span class={bem('text', false)}>{this.loadingText}</span>}
      </div>
    )
  }

  render () {
    return (
      <button
        class={this.buttonClass}
        style={this.hackButtonStyle}
        onClick={this.onClick}
      >
        {
          this.loading
            ? this.renderLoading()
            : <span class={bem('text', false)}>{this.text}</span>
        }
      </button>
    )
  }
}
