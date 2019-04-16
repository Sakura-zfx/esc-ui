module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: false,
        modules: 'commonjs'
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: false,
        useESModules: false
      }
    ],
    // '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-object-assign'
  ]
}
