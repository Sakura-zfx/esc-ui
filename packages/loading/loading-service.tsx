import { Component, Mixins } from 'vue-property-decorator'
import Loading from './loading'
import Popup from '../mixins/popup'

@Component({
  components: {
    'esc-loading': Loading
  }
})
export default class LoadingService extends Mixins(Popup) {
  isLayerTransparent = true

  open (isTransparent: boolean = true) {
    this.isLayerTransparent = isTransparent
    this.$emit('input', true)
  }

  render () {
    return (
      <div vShow={this.show} class='esc-loading__service'>
        <esc-loading value={true} color="white" />
      </div>
    )
  }
}
