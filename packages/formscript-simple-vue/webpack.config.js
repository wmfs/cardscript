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
      filename: 'vue-formscript.min.js',
      libraryTarget: 'window',
      library: 'VueFormscript'
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname, './lib/Formscript.vue'),
    output: {
      filename: 'vue-formscript.js',
      libraryTarget: 'umd',
      library: 'vue-formscript',
      umdNamedDefine: true
    }
  })
]
