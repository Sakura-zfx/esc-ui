const f = require('fs')
const fs = require('fs-extra')
const path = require('path')
const camelCase = require('camelcase')
const name = process.argv[2]

if (!name) {
  console.log('请输入组件名')
  process.exit(0)
}

const componentPath = path.resolve(__dirname, '../', 'packages', name)

// 创建模版文件
// index.tsx
// index.styl
// README.md
// demo/index.vue
const fnName = camelCase(name).toUpperCase()
const tsxContent = `import { FunctionalComponentOptions } from 'vue/types'
import { use, vw, isDef } from '../utils'

type Prop = {
}
const [ bem ] = use('${name}')

function ${fnName} (): FunctionalComponentOptions<Prop> {
  return {
    functional: true,
    name: '${fnName}',
    render (h, { props }) {
      return (
        <div class={bem()}>
        </div>
      )
    },
    install (vue: any) {
      vue.component(this.name, this)
    }
  }
}
export default ${fnName}()
`
const demoContent = `<template>
  <demo-wrap name="${name}">
    <${name} />
  </demo-wrap>
</template>

<script>
import DemoWrap from '@/components/DemoWrap.vue'
import ${fnName} from '../'

export default {
  name: 'Demo${fnName}',
  components: {
    DemoWrap,
    ${fnName}
  }
}
</script>
<style lang="stylus">
@import '../index.styl'
</style>
`

const resolve = file => path.resolve(componentPath, file)
fs.ensureFileSync(resolve('index.styl'))
fs.outputFileSync(resolve('index.tsx'), tsxContent)
fs.outputFileSync(resolve('README.md'), `## ${fnName}`)
fs.outputFileSync(resolve('demo/index.vue'), demoContent)

// 修改 docs 入口展示
const docsConstant = path.resolve(__dirname, '../docs', 'src', 'constant', 'index.ts')
let content = f.readFileSync(docsConstant, 'utf8')

if (!new RegExp(fnName).test(content)) {
  content = content.replace('/*inject import*/', `import ${fnName} from '@@/${name}/README.md'\n/*inject import*/`)
  content = content.replace('/*inject export*/', `${fnName},\n  /*inject export*/`)
  f.writeFileSync(docsConstant, content, 'utf8')
}
