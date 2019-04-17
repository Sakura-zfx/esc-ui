const path = require('path')
const fs = require('fs-extra')
const babel = require('@babel/core')
const components = require('./get-component')()
const babelConfig = {
  configFile: path.join(__dirname, './babel.config.js')
}

const scriptRegExp = /\.(js|ts|tsx)$/
// const isDir = dir => fs.lstatSync(dir).isDirectory()
// const isCode = path => !/(demo|test|\.md)$/.test(path)
const isScript = path => scriptRegExp.test(path)
const srcPath = path.resolve(__dirname, '../packages')
const libPath = path.resolve(__dirname, '../lib')

function compiler(dir) {
  const files = fs.readdirSync(path.join(srcPath, dir))
  files.forEach(file => {
    const filePath = path.join(srcPath, dir, file)
    const fileLibPath = path.join(libPath, dir, file)

    // remove unnecessary files
    // if (!isCode(file)) {
    //   return fs.removeSync(filePath);
    // }

    // scan dir
    // if (isDir(filePath)) {
    //   return compile(filePath);
    // }

    // compile js or ts
    if (isScript(file)) {
      const { code } = babel.transformFileSync(filePath, babelConfig)
      // fs.removeSync(filePath);
      fs.outputFileSync(fileLibPath.replace(scriptRegExp, '.js'), code)
    }
  })
}

components.forEach(componentDir => {
  compiler(componentDir)
})
