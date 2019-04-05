<template>
  <div class="dialog">
    {{ content }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Bem from '@@/utils/bem'

const bem = Bem('dialog')

@Component
export default class Dialog extends Vue {
  showDialog: boolean = false

  // pit 必须赋值非必须 Strict Class Initialization
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html
  @Prop() readonly content!: string
}
</script>
