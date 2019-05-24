const path = require('path')
const fs = require('fs-extra')
// const { writeFileSync, readFileSync } = require('fs')
const babel = require('@babel/core')
const components = require('./get-component')()
const babelConfig = {
  configFile: path.join(__dirname, './babel.config.js')
}

const scriptRegExp = /\.(js|ts|tsx)$/
const isDir = dir => fs.lstatSync(dir).isDirectory()
// const isCode = path => !/(demo|test|\.md)$/.test(path)
const isScript = path => scriptRegExp.test(path)
const srcPath = path.resolve(__dirname, '../packages')
const libPath = path.resolve(__dirname, '../lib')

function compiler(dir) {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const fileLibPath = filePath.replace('/packages/', '/lib/')

    // remove unnecessary files
    // if (!isCode(file)) {
    //   return fs.removeSync(filePath);
    // }

    // scan dir
    if (isDir(filePath)) {
      return compiler(filePath)
    }

    // compile js or ts
    if (isScript(file)) {
      console.log(`打包 ${filePath.replace(srcPath, '')}`)
      const { code } = babel.transformFileSync(filePath, babelConfig)
      fs.outputFileSync(fileLibPath.replace(scriptRegExp, '.js'), code)
    }
  })
}

components.forEach(componentDir => {
  compiler(path.join(srcPath, componentDir))
})

// 添加一份 utils 组件格式
// function transferUtils (dir) {
//   const files = fs.readdirSync(dir)
//   files.forEach(file => {
//     const name = file.replace('.js', '')
//     if (name !== 'index') {
//       const target = path.join(dir.replace('/utils', ''), name, 'index.js')
//       fs.ensureFileSync(target)
//       writeFileSync(target, readFileSync(path.join(dir, file), 'utf8'), 'utf8')
//     }
//   })
// }
// transferUtils(path.join(libPath, 'utils'))
