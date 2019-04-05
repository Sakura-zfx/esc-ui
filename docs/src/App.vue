<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class App extends Vue {
	render() {
		return (
			<div id="app">
				<router-view />
			</div>
    )
  }
}
</script>

<style lang="stylus">
body
  margin 0
  padding 0
</style>
