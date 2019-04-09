// todo types 文件夹需要加入到 includes 下才能被自动识别？
import { DialogType } from '@@/dialog/declare'

declare module 'vue/types/vue' {
  interface Vue {
    $dialog: DialogType
  }
}
