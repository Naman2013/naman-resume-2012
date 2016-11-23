const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const apiUrl = process.env.apiUrl || '';
const apiPortNumber = process.env.apiPortNumber || '';

module.exports = {
  devtool: 'source-map',
  entry: {
    vendors: [
      'bootstrap',
      'classnames',
      'cookie',
      'lodash',
      'moment',
      'moment-countdown',
      'moment-timezone',
      'axios',
      'react',
      'react-addons-css-transition-group',
      'react-bootstrap',
      'react-dom',
      'react-draggable',
      'react-onclickoutside',
      'react-redux',
      'react-remarkable',
      'react-router',
      'react-router-redux',
      'react-scroll',
      'react-slick',
      'react-tabs',
      'react-tag-input',
      'redux',
      'redux-form',
      'redux-logger',
      'redux-thunk',
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
        test: /\.json$/,
        loaders: ['json-loader'],
      },
      { // string-replace loader is here to replace URL's mapped to /api in code
        test: /\.(js)$/,
        loader: 'string-replace',
        exclude: /node_modules/,
        query: {
          search: '/api/',
          replace: !!apiUrl ? `${apiUrl}:${apiPortNumber}/api/` : '/api/',
          flags: 'g'
        }
      },
      { // string-replace to replace sse environment url's with the appropriate address
        test: /\.(js)$/,
        loader: 'string-replace',
        exclude: /node_modules/,
        query: {
          search: '/dev-sse/',
          replace: `${apiUrl}:`,
          flags: 'g'
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
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[local]',
          'postcss'
        ],
      },
      {
        test: /\.scss$/,
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
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
};
