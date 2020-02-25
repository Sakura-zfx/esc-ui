module.exports = {
  presets: [
    'vca-jsx',
    '@vue/app'
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'esc-ui',
        style: true
      },
      'esc-ui'
    ]
  ]
}
