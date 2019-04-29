import Dialog from '@@/dialog/README.md'
import Button from '@@/button/README.md'
import Loading from '@@/loading/README.md'
import Popup from '@@/popup/README.md'
import Field from '@@/field/README.md'
import Photo from '@@/photo/README.md'
import InfiniteScroll from '@@/infinite-scroll/README.md'

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
        title: 'Popup 弹出层',
        name: 'popup'
      },
      {
        title: 'Field 字段输入',
        name: 'field'
      },
      {
        title: 'Photo 图片',
        name: 'photo'
      },
      {
        title: 'InfiniteScroll 列表',
        name: 'infinite-scroll'
      }
    ]
  }
]

export const markdown = {
  Dialog,
  Button,
  Loading,
  Popup,
  Field,
  Photo,
  InfiniteScroll
}
