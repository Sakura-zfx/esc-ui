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
        title: '对话框',
        name: 'dialog'
      }
    ]
  }
]
