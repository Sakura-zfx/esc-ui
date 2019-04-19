import { Vue, Component } from 'vue-property-decorator'
import { use } from '../utils'

const [ bem ] = use('cell-group')

@Component
export default class EscCellGroup extends Vue {
  render() {
    return (
      <div class={bem()}>
        {this.$slots.default}
      </div>
    )
  }
}
