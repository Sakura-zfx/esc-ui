<template>
  <div :class="bem()">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Bem from '@@/utils/bem'

const bem = Bem('button')

@Component({
  methods: {
    bem
  }
})
export default class EscButton extends Vue {

}
</script>
