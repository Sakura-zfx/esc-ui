## Avatar

头像组件，支持彩云系、默认头像、默认文字组件样式，使用方式：

```js
import { Avatar } from 'esc-ui'
```

代码示例

```html
<template>
  <p>基础例子</p>
  <avatar
    name="杨明"
    uid="1"
  />
  <p>设置默认头像</p>
  <avatar
    uid="2"
    default-url="https://global.uban360.com/sfs/file?digest=fid961172950d4ec373a81fcda8e33f96e2&fileType=2"
  />
  <p>头像圆角</p>
  <avatar
    name="杨明"
    uid="1"
    round
  />
  <p>设置头像尺寸</p>
  <avatar
    name="杨明"
    uid="1"
    size="30px"
  />
  <p>设置头像圆角尺寸</p>
  <avatar
    name="杨明"
    uid="1"
    radius="10px"
  />
</template>
```

### Props

> 默认情况下是显示的名字作为无头像时的占位

名称|类型|默认值|说明
----|----|-----|----
uid|string|-|-
name|string|-|会截取倒数2个字符
defaultUrl|string|-|指定无头像时的占位
prefix|string|`window._APP_CONFIG.avatarUrl`|彩云系头像地址前缀
round|boolean|false|是否圆型头像
radius|string|`4px`|头像圆角
size|string|`45px`|头像尺寸




