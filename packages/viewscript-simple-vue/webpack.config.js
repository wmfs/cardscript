const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const config = {
  output: {
    path: path.resolve(__dirname, './dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style!less!css'
      }
    ]
  },
  externals: {},
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
}

module.exports = [
  merge(config, {
    entry: path.resolve(__dirname, './lib/plugin.js'),
    output: {
      filename: 'vue-viewscript.min.js',
      libraryTarget: 'window',
      library: 'VueViewscript'
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname, './lib/Viewscript.vue'),
    output: {
      filename: 'vue-viewscript.js',
      libraryTarget: 'umd',
      library: 'vue-viewscript',
      umdNamedDefine: true
    }
  })
]
