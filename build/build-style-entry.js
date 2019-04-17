const dependencyTree = require('dependency-tree')
const path = require('path')
const fs = require('fs-extra')
const components = require('./get-component')('style')
const whiteList = ['popup']

function getComponentNameFromPath(file) {
  let last = file.lastIndexOf('/')
  file = file.substr(0, last)
  last = file.lastIndexOf('/')
  return file.substr(last + 1)
}

function getDependence(component) {
  const result = []
  const checkList = whiteList.concat(components)
  const directory = path.resolve(__dirname, '../lib')
  const filename = path.join(directory, component, 'index.js')
  const dependence = dependencyTree({
    directory,
    filename,
    filter: path => !~path.indexOf('node_modules')
  })

  const search = (obj) => {
    Object.keys(obj).forEach(file => {
      const name = getComponentNameFromPath(file)
      if (checkList.some(x => x === name)) {
        if (whiteList.every(x => x !== name)) {
          result.push(name)
        }
        obj[file] && search(obj[file])
      }
    })
  }
  search(dependence[filename])
  return result
}

function writeStyle(component, styleArr) {
  const componentPath = path.resolve(__dirname, '../lib', component, 'style/index.js')
  const expression = styleArr.map(x =>
    `require("${component === x ? '../index.css' : `../../${x}/index.css`}")`
  ).join('\n')
  fs.outputFileSync(componentPath, expression)
}

components.forEach(name => {
  const styleComponent = getDependence(name)
  writeStyle(name, [...new Set(styleComponent)])
})
