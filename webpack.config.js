const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const apiEnvironment = process.env.apiEnv || '';

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
      { // string-replace loader is here to replace URL's mapped to /api in code
        test: /\.(js)$/,
        loader: 'string-replace',
        exclude: /node_modules/,
        query: {
          search: '/api/',
          replace: `${apiEnvironment}/api/`
        }
      },
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
        //exclude: /node_modules/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[local]',
          'postcss'
        ],
      },
      {
        test: /\.scss$/,
        // exclude: /node_modules/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[local]',
          'postcss',
          'sass'
        ],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|woff)$/,
        loader: 'url-loader',
      },
      { // loader for bootstrap
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      { // loader for bootstrap
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      { // loader for bootstrap
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'commons.js'),
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      { from: './assets/**/*' }
    ])
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname + '/'),
    historyApiFallback: true,
    recordsPath: path.resolve('/'),
    proxy: {
      '/api/**': {
        target: 'https://saturn.slooh.com:444',
        changeOrigin: true,
        secure: true,
      },
      '/sloohapp/**': {
        target: 'https://saturn.slooh.com:444',
        changeOrigin: true,
        secure: true,
      },
      '/sse/**': {
        target: 'https://mars.slooh.com:3004',
        changeOrigin: true,
        secure: true,
      },
      '/util/**': {
        target: 'https://mars.slooh.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
};
