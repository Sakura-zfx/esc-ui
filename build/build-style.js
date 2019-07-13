const components = require('./get-component')('style')
const { compilerCss, checkComponentHasStyle } = require('./compilerCss')

components.forEach(name => {
  if (checkComponentHasStyle(name)) {
    compilerCss(name)
  }
})

