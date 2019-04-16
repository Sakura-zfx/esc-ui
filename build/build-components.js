const path = require('path')
const fs = require('fs-extra')
const babel = require('@babel/core')
const babelConfig = {
  configFile: path.join(__dirname, './babel.config.js')
}

const componentPath = path.resolve(__dirname, '../packages')
const targetPath = path.resolve(__dirname, '../lib')

const { code } = babel.transformFileSync(componentPath + '/dialog/index.ts', babelConfig)
fs.outputFileSync(targetPath + '/index.js', code)
