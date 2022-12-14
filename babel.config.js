const path = require('path')
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'zc-rn',
        customName: (name) => {
          return path.resolve(__dirname, `./components/${name}`)
        },
      },
    ],
  ],
}
