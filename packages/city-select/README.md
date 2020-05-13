## CitySelect

级联数据选择

```js
import { CitySelect } from 'esc-ui'
```

基础用法

```html
<template>
  <city-select
    color="blue"
    :load="load"
  />
</template>

<script>
export default {
  methods: {
    load (level, selected) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (level === 0) {
            resolve([{ name: '中国', code: 0 }])
          } else if (level === 1) {
            resolve([{ name: '浙江', code: 1 }, { name: '湖北', code: 2 }])
          } else if (level === 2) {
            resolve([{ name: '杭州', code: 1 }, { name: '绍兴', code: 2 }])
          } else {
            resolve()
          }
        }, 1000)
      })
    }
  }
}
</script>
```

结合 [Popup](#/popup) 一起使用

```html
<template>
    <popup
      v-model="showPopup"
      position="bottom"
      close-on-click-layer
    >
      <span slot="title-center">选择地址</span>
      <city-select
        :load="load"
        @input="handleEnd"
      />
    </popup>
</template>

<script>
export default {
  data () {
    return {
      showPopup: false,
      selected: []
    }
  },
  methods: {
    load (level, selected) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (level === 0) {
            resolve([{ name: '中国', code: 0 }])
          } else if (level === 1) {
            resolve([{ name: '浙江', code: 1 }, { name: '湖北', code: 2 }])
          } else if (level === 2) {
            resolve([{ name: '杭州', code: 1 }, { name: '绍兴', code: 2 }])
          } else {
            resolve()
          }
        }, 1000)
      })
    },

    handleEnd (arr) {
      this.selected = arr
      this.showPopup = false
    }
  }
}
</script>
```

### Props

参数|类型|默认值|说明
----|----|-----|----
color|`string`|`red`| -
load| `(level: number, selected: Item[]) => Promise<Item[]>` | - | 加载数据的方法

> 注意，返回的数据 type Item = { name, code }
