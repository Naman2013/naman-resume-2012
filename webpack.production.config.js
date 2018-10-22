const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const WebpackMd5Hash = require('webpack-md5-hash');
const WebpackMd5Hash = Math.random() * 100000;

const apiUrl = process.env.apiUrl || '';
const apiPortNumber = process.env.apiPortNumber || '';

module.exports = {
  devtool: 'source-map',
  entry: {
    vendors: [
      'classnames',
      'cookie',
      'lodash',
      'moment',
      'moment-timezone',
      'axios',
      'react',
      'react-addons-css-transition-group',
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
    publicPath: '/',
    filename: '[chunkhash].[id].[name].js',
    sourceMapFilename: '[name].js.map',
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loaders: ['json-loader'],
      },
      { // string-replace loader is here to replace URL's mapped to /api in code
        test: /\.(js)$/,
        loader: 'string-replace-loader',
        exclude: /node_modules/,
        query: {
          search: '/api/',
          replace: apiUrl ? `${apiUrl}:${apiPortNumber}/api/` : '/api/',
          flags: 'g',
        },
      },
      { // string-replace replace localhost with slooh.com
        test: /\.(js)$/,
        loader: 'string-replace-loader',
        exclude: /node_modules/,
        query: {
          search: 'domain: \'localhost\', secure: false',
          replace: 'domain: \'.slooh.com\', secure: true',
          flags: 'g',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: [
            ['styled-jsx/babel', { 'optimizeForSpeed': false }],
            'transform-object-rest-spread',
            'transform-decorators-legacy',
            'transform-class-properties',
            'transform-function-bind',
          ],
          presets: ['env', 'react'],
        },
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[local]',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[local]',
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|woff)$/,
        loader: 'url-loader',
        options: {
          limit: 40,
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 40,
            },
          },
        ],
      },
      { // loader for bootstrap
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      { // loader for bootstrap
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      { // loader for bootstrap
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
    ],
  },
  plugins: [
    // new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'common.js',
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};
