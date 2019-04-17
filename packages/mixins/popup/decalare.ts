export type LayerConfig = {
  zIndex: number,
  isTransparent: boolean,
  containerElement: Node
}

export type LayerStackItem = {
  vm: any,
  config: LayerConfig
}

// export interface layerVNode {
//   visible: boolean
// }
