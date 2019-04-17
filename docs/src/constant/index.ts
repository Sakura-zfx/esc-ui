import Dialog from '@@/dialog/README.md'
import Button from '@@/button/README.md'
import Loading from '@@/loading/README.md'
import Popup from '@@/popup/README.md'

export interface PackageItem {
  title: string,
  name: string
}

export interface PackageItemGroup {
  items: PackageItem[],
  title: string
}

export const routerDir: PackageItemGroup[] = [
  {
    title: '基础组件',
    items: [
      {
        title: 'Dialog 弹出框',
        name: 'dialog'
      },
      {
        title: 'Button 按钮',
        name: 'button'
      },
      {
        title: 'Loading 加载',
        name: 'loading'
      },
      {
        title: 'Popup 弹层',
        name: 'popup'
      }
    ]
  }
]

export const markdown = {
  Dialog,
  Button,
  Loading,
  Popup
}
