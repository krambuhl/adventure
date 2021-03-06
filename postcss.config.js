module.exports = {
  plugins: [
    ['rfs', {
      remValue: 14
    }],
    ['postcss-import', {
      addModulesDirectories: [
        'styles'
      ]
    }],
    ['postcss-preset-env', {
      stage: 1,
      features: {
        'nesting-rules': true
      }
    }]
  ]
}
