import { Vue, Component, Prop } from 'vue-property-decorator'
import { use } from '../utils'
import { LoadingColor, LoadingSize } from 'types/loading'

const [ bem ] = use('loading')

@Component
export default class Loading extends Vue {
  @Prop({ default: false, type: Boolean }) readonly value!: boolean
  @Prop({ default: 'default', type: String }) readonly size!: LoadingSize
  @Prop({ default: 'black', type: String }) readonly color!: LoadingColor

  get isWhiteLoading () {
    return this.color === 'white'
  }

  render () {
    return (
      <div vShow={this.value} class={bem([this.size, { white: this.isWhiteLoading }])}>
        <svg class={bem('circular', false)} viewBox="25 25 50 50">
          <circle
            class={bem('path', { white: this.isWhiteLoading, black: !this.isWhiteLoading })}
            cx="50"
            cy="50"
            r="20"
            fill="none"
          />
        </svg>
      </div>
    )
  }
}
