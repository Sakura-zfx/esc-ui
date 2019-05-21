## Bem

css BEM 命名规则生成函数，目的是优化在 `template` 或 `jsx` 中 BEM 的写法。

引入

```js
import { use } from 'esc-ui/lib/utils'

// app 默认是 esc
const [ bem ] = use(moduleName: string, app?: string)
```

代码演示

```jsx
class Cart {
  render() {
    const [ bem ] = use('cart', 'jd')
    return (
      <div class={bem()}>
        <div class={bem('goods', false)}>
          <div class={bem('goods', ['img', { normal: true }])}>
        </div>
      </div>
    )
  }
}
```

上面的栗子中，class 分别为 

- `jd-cart`
- `['jd-cart__goods']`
- `['jd-cart__goods', 'jd-cart__goods--img', {jd-cart__goods--normal: true}]`

### 用法举例：
 * 初始化命名空间 const bem = Bem('button') => esc-button
 * bem 接受 3 个参数，模块、修饰符、是否自动添加父级 class
 * 模块举例：
    - `bem()` => `'esc-button'`
    - `bem('large')` => `['esc-button', 'esc-button__large']` 自动添加了父级 class
    - `bem('large', false)` => `['esc-button__large']`
    - `bem({ large: true, plain: false })` => `['esc-button', 'esc-button__large']`
    - `bem(['primary', { plain: true }])`  => `['esc-button', 'esc-button__large', 'esc-button__plain']`
 - 修饰符举例（模块只能是字符串）：
    - `bem('primary', 'text')` => `['esc-button__primary', 'esc-button__primary--text']` 自动添加了父级 class
    - `bem('primary', ['text', { loading: true }], false)` => `['esc-button__primary--text', { 'esc-button__primary--loading': true }]`
