module.exports = {
  chainWebpack: config => {
    // https://github.com/neutrinojs/webpack-chain/tree/v4
    config.entry('app')
      .clear()
      .add('./docs/src/main.ts')
      .end()
      .resolve.alias
      .set('@', `${__dirname}/docs/src`)
      .set('@@', `${__dirname}/packages`)
      .end()

    config.plugin('html')
      .tap(args => {
        args[0].template = `${__dirname}/docs/public/index.html`
        return args
      })
  }
}
