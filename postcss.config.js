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
    'postcss-nested',
    ['postcss-preset-env', {
      stage: 1,
      features: {
        'nesting-rules': false
      }
    }]
  ]
}
