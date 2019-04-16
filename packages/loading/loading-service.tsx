import { Component, Mixins } from 'vue-property-decorator'
// @ts-ignore
import Loading from './loading.tsx'
import Popup from '@@/mixins/popup'

@Component({
  components: {
    'esc-loading': Loading
  }
})
export default class LoadingService extends Mixins(Popup) {
  open() {
    this.$emit('input', true)
  }

  render() {
    return (
      <div vShow={this.show} class='esc-loading__service'>
        <esc-loading value={true} color="white" />
      </div>
    )
  }
}
