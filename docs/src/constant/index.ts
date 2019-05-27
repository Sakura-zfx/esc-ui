import Dialog from '@@/dialog/README.md'
import Button from '@@/button/README.md'
import Loading from '@@/loading/README.md'
import Popup from '@@/popup/README.md'
import Field from '@@/field/README.md'
import Photo from '@@/photo/README.md'
import InfiniteScroll from '@@/infinite-scroll/README.md'
import Sentry from '@@/sentry/README.md'
import Dot from '@@/dot/README.md'
import Http from '@@/http/README.md'
import Bem from '@@/bem/README.md'

export interface PackageItem {
  title: string
  name: string
  noDemo?: boolean
}

export interface PackageItemGroup {
  items: PackageItem[]
  title: string
}

export const routerDir: PackageItemGroup[] = [
  {
    title: '基础通用组件',
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
      }
    ]
  },
  {
    title: '基础业务组件',
    items: [
      {
        title: 'Photo 图片',
        name: 'photo'
      },
      {
        title: 'InfiniteScroll 列表',
        name: 'infinite-scroll'
      }
    ]
  },
  {
    title: '工具函数',
    items: [
      {
        title: 'Http',
        noDemo: true,
        name: 'http'
      },
      {
        title: 'Bem 样式函数',
        noDemo: true,
        name: 'bem'
      },
      {
        title: 'Sentry 错误捕获',
        noDemo: true,
        name: 'sentry'
      },
      {
        title: 'Dot 打点',
        noDemo: true,
        name: 'dot'
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
  InfiniteScroll,
  Sentry,
  Dot,
  Bem,
  Http
}
