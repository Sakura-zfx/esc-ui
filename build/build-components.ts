const path = require('path')
const fs = require('fs-extra')
const babel = require('@babel/core')
const components = require('./get-component')()
const babelConfig = {
  configFile: path.join(__dirname, 'babel.config.js')
}

const scriptRegExp: RegExp = /\.(js|ts|tsx)$/
const isDir = (dir: string): boolean => fs.lstatSync(dir).isDirectory()
// const isCode = path => !/(demo|test|\.md)$/.test(path)
const isScript = (path: string): boolean => scriptRegExp.test(path)
const srcPath: string = path.resolve(__dirname, '../packages')
// const libPath = path.resolve(__dirname, '../lib')

function compiler(dir: string) {
  const files = fs.readdirSync(dir)
  files.forEach((file: string) => {
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
      const { code } = babel.transformFileSync(filePath, babelConfig)
      // fs.removeSync(filePath);
      fs.outputFileSync(fileLibPath.replace(scriptRegExp, '.js'), code)
    }
  })
}

components.forEach((componentDir: string) => {
  compiler(path.join(srcPath, componentDir))
})
