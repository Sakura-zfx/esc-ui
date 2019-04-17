const fs = require('fs-extra')
const path = require('path')

const excludes = [
  'mask-layer',
  'style',
  'mixins',
  'utils',
  '.DS_Store'
]

module.exports = function () {
  const dirs = fs.readdirSync(path.resolve(__dirname, '../packages'))
  return dirs.filter(dirName => excludes.indexOf(dirName) === -1)
}
