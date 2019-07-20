import Vue from 'vue'
import context from './context'
import EscMask from '../../mask-layer'

import { VNode } from 'vue/types'
import { LayerConfig } from './decalare'
let layerInstance: Vue & VNode & { visible: boolean }

export function updateLayer (): void {
  if (!layerInstance) {
    const MaskConstructor = Vue.extend(EscMask)
    layerInstance = new MaskConstructor({
      el: document.createElement('div')
    })
    layerInstance.$on('on-close', () => {
      if (context.top) {
        const { vm } = context.top
        if (vm.closeOnClickLayer) {
          vm.close()
        }
      }
    })
  }
  if (context.top) {
    const { config } = context.top
    config.containerElement.appendChild(layerInstance.$el)
    Object.assign(layerInstance, config, {
      visible: true
    })
  } else {
    layerInstance.visible = false
  }
}

export function showLayer (vm: any, config: LayerConfig): void {
  context.stack.push({ vm, config })
  updateLayer()
}

export function closeLayer (vm: any): void {
  const { stack } = context

  if (stack.length) {
    if (context.top.vm === vm) {
      stack.pop()
      updateLayer()
    } else {
      context.stack = stack.filter(item => item.vm !== vm)
    }
  }
}
