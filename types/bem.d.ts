import { Mods } from '@@/utils/bem'

export interface bem {
  (
    module?: Mods,
    modifiers?: Mods | boolean,
    autoAddParent?: boolean
  ): Mods
}

export interface Bem {
  (name: string, app?: string): bem
}
