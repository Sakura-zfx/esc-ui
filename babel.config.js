module.exports = {
  presets: [
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
