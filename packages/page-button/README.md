## PageButton

H5 页面提交样式组件

代码演示
```html
<page-button
  :buttons="[
    { text: '联系客服', color: '#FF4D4D', opacity: 0, round: true },
    { text: '审批通过', color: '#2DC888', click: handleClick }
  ]"
/>
```

Props

```typescript
type ButtonItem = {
  text: string
  color: string
  click: (e: EventListener) => void
  opacity: number
  round: boolean
}
type Buttons = Array<ButtonItem>
```
