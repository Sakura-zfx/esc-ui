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
    title: '电商类',
    items: [
      {
        title: '对话框',
        name: 'dialog'
      }
    ]
  }
]
