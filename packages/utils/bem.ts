
export default (name: string) => (module?: string, modifiers?: string): string => {
  return `esc-${name}${module ? `__${module}` : ''}${modifiers ? `--${modifiers}` : ''}`
}
