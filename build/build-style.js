const stylus = require('stylus')
const path = require('path')
const { readFileSync } = require('fs')
const fs = require('fs-extra')
const CleanCSS = require('clean-css')
const srcPath = path.join(__dirname, '../packages')
const libPath = path.join(__dirname, '../lib')
const components = require('./get-component')('style')
const getStylePath = name => path.join(srcPath, name, 'index.styl')

function checkComponentHasStyle(component) {
  return fs.existsSync(getStylePath(component))
}

function compiler(name) {
  const stylusString = readFileSync(getStylePath(name), 'utf8')

  stylus(stylusString)
    // .set('filename', 'nesting.css')
    .include(path.join(srcPath, 'style'))
    .render(function(err, css){
      if (err) throw err
      fs.outputFileSync(path.join(libPath, name, 'index.css'), new CleanCSS().minify(css).styles)
    })
}

components.forEach(name => {
  if (checkComponentHasStyle(name)) {
    compiler(name)
  }
})

