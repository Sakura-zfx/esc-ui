import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { use, isDef, formatNumber } from '../utils'

type FieldType = 'input' | 'textarea'
type FieldNumberFixed = 0 | 1 | 2
type FieldAlign = 'left' | 'right'

const [ bem ] = use('field')

@Component
export default class EscField extends Vue {
  @Prop({ type: String, default: 'input' }) readonly type!: FieldType
  @Prop(String) readonly label!: string
  @Prop(String) readonly labelClass!: string
  @Prop(Number) readonly fixed!: FieldNumberFixed
  @Prop([Number, String]) readonly value!: string | number
  @Prop({ type: Number, default: Number.MAX_SAFE_INTEGER }) readonly max!: number
  @Prop({ type: Number, default: 0 }) readonly min!: number
  @Prop({ type: Number, default: 80 }) readonly minHeight!: number
  @Prop(Number) readonly maxHeight!: number
  @Prop(Boolean) readonly autoHeight!: boolean
  @Prop({ type: String, default: 'left' }) readonly inputAlign!: FieldAlign
  @Prop({ type: String, default: '请输入' }) readonly placeholder!: string
  @Prop(Boolean) readonly isInputNumber!: boolean
  @Prop(Boolean) readonly readonly!: boolean

  // readonly min: number = 0
  inputValueLocal: string = ''
  inputElem: any = null

  get formatFixed () {
    if (isDef(this.fixed)) {
      return this.fixed <= 2 && this.fixed >= 0 ? this.fixed : undefined
    }
    return undefined
  }

  get reg (): RegExp | null {
    let reg: RegExp | null = null
    if (this.isInput && this.formatFixed === 0) {
      reg = /^\d+$/
    } else if (
      this.isInput &&
      this.formatFixed !== undefined &&
      this.formatFixed > 0
    ) {
      reg = new RegExp(`^\\d+(\\.{0,1}\\d{0,${this.formatFixed}})$`)
    }
    return reg
  }

  get isInput () {
    return this.type === 'input'
  }

  get isTextArea () {
    return this.type === 'textarea'
  }

  get isInputNumberTool () {
    return this.isInputNumber && this.isNumber
  }

  get isNumber () {
    return this.isInput && isDef(this.formatFixed)
  }

  get isValueText () {
    return this.isTextArea || (this.isInput && !this.isNumber)
  }

  get inputValue () {
    return this.inputValueLocal
  }

  set inputValue (val: string) {
    if (this.isValueText) {
      this.emit(val)

      if (this.isTextArea && this.autoHeight) {
        // 自适应高度
        this.handleAutoHeight()
      }
    } else {
      // @ts-ignore
      const input: HTMLInputElement = this.$refs.input
      if (val === '') {
        this.emit('')
      } else if (!(this.reg as RegExp).test(val)) {
        // 不合法的数字
        input.value = this.inputValueLocal
      } else if (/^\d+\.$/.test(val)) {
        // 小数点结尾，认为未输入完成
        // this.emit(val)
      } else if (Number(val) > this.max) {
        // 大于最大值
        input.value = String(this.max)
        this.emit(String(this.max))
      } else if (Number(val) < this.min) {
        // 小于最小值
        input.value = String(this.min)
        this.emit(String(this.min))
      } else {
        this.emit(val)
      }
    }
  }

  @Watch('value')
  onValueChange (val: string) {
    this.inputValue = val
  }

  created () {
    if (isDef(this.value)) {
      this.inputValueLocal = String(this.value)
      this.blurValue()
    }
  }

  mounted () {
    this.inputElem = this.$refs.input
  }

  blurValue () {
    if (
      !this.readonly &&
      this.isNumber &&
      this.inputValueLocal !== ''
    ) {
      const val = Number(this.inputValueLocal)
      this.emit(formatNumber(val, this.formatFixed as number))
    }
  }

  emit (val: string) {
    this.$emit('input', val)
    this.inputValueLocal = val
  }

  handleAutoHeight () {
    this.inputElem.style.height = 'auto'
    let height = this.inputElem.scrollHeight
    if (this.maxHeight) {
      height = Math.min(height, this.maxHeight)
    }
    if (this.minHeight) {
      height = Math.max(height, this.minHeight)
    }
    this.inputElem.style.height = height + 'px'
  }

  addSubTool (isAdd: boolean) {
    const step = 1 / Math.pow(10, this.formatFixed as FieldNumberFixed)
    const val = this.inputValueLocal ? Number(this.inputValueLocal) : 0
    this.inputValue = formatNumber(val + (isAdd ? step : -step), this.formatFixed as FieldNumberFixed)
  }

  renderTextArea () {
    return (
      <div class={bem('input-wrap', false)}>
        <textarea
          ref="input"
          style={{ minHeight: this.minHeight + 'px' }}
          vModel_trim={this.inputValue}
          placeholder={this.placeholder}
          readonly={this.readonly}
        />
      </div>
    )
  }

  renderInput () {
    const isTel = this.isInput && this.formatFixed === 0
    const cls = bem(['input-wrap'], false)
    return (
      <div class={cls}>
        <input
          ref="input"
          type={isTel ? 'tel' : 'text'}
          vModel_trim={this.inputValue}
          onBlur={this.blurValue}
          placeholder={this.placeholder}
          readonly={this.readonly}
        />
      </div>
    )
  }

  renderInputNumberTool (child: () => JSX.Element) {
    return (
      <div class={bem({ 'input-number-tool': this.isInputNumberTool }, false)}>
        <div
          class={bem(
            'input-number-tool',
            ['add', { disabled: Number(this.inputValue) === this.max }],
            false
          )}
          onClick={() => this.addSubTool(true)}
        >
          +
        </div>
        {child()}
        <div
          class={bem(
            'input-number-tool',
            ['sub', { disabled: Number(this.inputValue) === this.min }],
            false
          )}
          onClick={() => this.addSubTool(false)}
        >
          -
        </div>
      </div>
    )
  }

  renderLabel () {
    const { label } = this.$slots
    if (label) {
      return label
    } else if (this.label) {
      return (
        <div class={bem('label', false) + (this.labelClass ? ` ${this.labelClass}` : '')}>
          {this.label}
        </div>
      )
    }
    return null
  }

  render () {
    const cls = bem({
      [this.inputAlign]: !!this.inputAlign && !this.isTextArea,
      'flex-start': this.isTextArea,
      wrap: !!(this.$slots.label || this.label) || !this.isInputNumberTool
    })
    return (
      <div class={cls}>
        {this.renderLabel()}
        {
          this.isTextArea
            ? this.renderTextArea()
            : this.isInputNumberTool
              ? this.renderInputNumberTool(this.renderInput)
              : this.renderInput()
        }
      </div>
    )
  }
}
