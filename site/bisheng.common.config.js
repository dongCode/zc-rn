const path = require('path')
const replaceLib = require('@ant-design/tools/lib/replaceLib')
const getWebpackConfig = require('@ant-design/tools/lib/getWebpackConfig')

const { webpack } = getWebpackConfig

const useReact = process.env.DEMO_ENV === 'react'
const isDev = process.env.NODE_ENV === 'development'

function alertBabelConfig(rules) {
  rules.forEach((rule) => {
    if (rule.loader && rule.loader === 'babel-loader') {
      rule.options.plugins.push(replaceLib)
    } else if (rule.use) {
      alertBabelConfig(rule.use)
    }
  })
}

const reactExternals = {}

const preactExternals = {
  preact: 'preact',
}

const preactAlias = {
  react: 'preact-compat',
  'react-dom': 'preact-compat',
  'create-react-class': 'preact-compat/lib/create-react-class',
  preact$: 'preact/dist/preact.js', // https://github.com/developit/preact/issues/924
}

const prodExternals = useReact ? reactExternals : preactExternals

module.exports = {
  filePathMapper(filePath) {
    if (filePath === '/index.html') {
      return ['/index.html', '/index-cn.html']
    }
    if (filePath.endsWith('/index.html')) {
      return [filePath, filePath.replace(/\/index\.html$/, '-cn/index.html')]
    }
    if (filePath !== '/404.html' && filePath !== '/index-cn.html') {
      return [filePath, filePath.replace(/\.html$/, '-cn.html')]
    }
    return filePath
  },
  webpackConfig(config) {
    config.externals = {
      // history: 'History',
      // 'babel-polyfill': 'this', // hack babel-polyfill has no exports
    }
    // dev 环境下统一不 external
    // 因为 preact/devtools 未提供 umd
    if (!isDev) {
      config.externals = Object.assign(config.externals, prodExternals)
    } else {
      config.devtool = 'source-map'
    }

    alertBabelConfig(config.module.rules)

    config.resolve.alias = {
      'zc-rn/lib': path.join(process.cwd(), 'components'),
      'zc-rn': process.cwd(),
      site: path.join(process.cwd(), 'site'),
    }
    if (!useReact) {
      config.resolve.alias = Object.assign(config.resolve.alias, preactAlias)
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        PREACT_DEVTOOLS: isDev && !useReact,
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
    )

    // fix webpack-dev-server "SyntaxError: Use of const in strict mode." ref https://github.com/mrdulin/blog/issues/35
    // https://github.com/webpack/webpack/issues/2031#issuecomment-339336830
    config.module.rules.push({
      test: /webpack-dev-server|to-fast-properties/,
      loader: 'babel-loader',
    })
    return config
  },
  lessConfig: {
    javascriptEnabled: true,
  },
  htmlTemplateExtraData: {
    isDev,
    useReact,
    // useHD: process.env.HD_ENV === 'hd',
  },
  themeConfig: {
    siteTitle: '众丞 RN',
    siteSubTitle: '众丞移动端 React Native 组件库',
    categoryOrder: [],
    cateChinese: {},
    docVersions: {},
  },
  devServerConfig: {
    disableHostCheck: true,
  },
}
