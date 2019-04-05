<template>
  <div class="home">
    <Layout />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Layout from '../components/Layout.vue'

@Component({
  components: {
    Layout
  }
})
export default class Home extends Vue {
}
</script>
