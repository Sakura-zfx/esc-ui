// const marked = require('marked')
// const renderer = new marked.Renderer()

module.exports = {
  pages: {
    index: {
      entry: 'docs/src/main.ts',
      outputDir: 'docs/dist/',
      template: 'docs/public/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    demo: {
      entry: 'docs/src/demo/main.ts',
      outputDir: 'docs/dist/demo/',
      template: 'docs/public/index.html',
      filename: 'demo.html',
      chunks: ['chunk-vendors', 'chunk-common', 'demo']
    }
  },

  chainWebpack: config => {
    // https://github.com/neutrinojs/webpack-chain/tree/v4
    config
      // .entry('app')
      // .clear()
      // .add('./docs/src/main.ts')
      // .end()
      .resolve.alias
      .set('@', `${__dirname}/docs/src`)
      .set('@@', `${__dirname}/packages`)
      .end()
      .extensions.add('.md')
      .end()

    config.module
      .rule('md')
      .test(/\.md$/)
      .use('marked')
        .loader('vue-loader')

    config.module
      .rule('md')
      .use('marked2')
        .loader('@vant/markdown-loader')

    // config.plugin('html')
    //   .tap(args => {
    //     console.log(args)
    //     args[0].template = `${__dirname}/docs/public/index.html`
    //     return args
    //   })
  }
}
