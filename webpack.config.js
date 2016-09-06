const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    vendors: [
      'classnames',
      'cookie',
      'moment',
      'moment-countdown',
      'react',
      'react-addons-css-transition-group',
      'react-dom',
      'react-onclickoutside',
      'react-redux',
      'react-router',
      'redux',
      'redux-form',
      'redux-thunk',
      'superagent',
      'superagent-prefix',
      'superagent-promise-plugin',
      'superagent-use',
    ],
    bundle: './app/index.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    sourceMapFilename: "[name].js.map",
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime', 'transform-decorators-legacy'],
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[local]',
          'postcss'
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[local]',
          'postcss',
          'sass'
        ],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|woff)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'commons.js'),
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve( __dirname + '/'),
    historyApiFallback: true,
    recordsPath: path.resolve('/'),
    proxy: {
      '/events/**': {
        target: 'https://saturn.slooh.com:444',
        changeOrigin: true,
        secure: true
      },
      '/dist/nav.json': {
        target: 'http://slooh.enivrez.com/',
        changeOrigin: true,
        secure: false
      }
    }
  }
};
