const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const apiUrl = process.env.apiUrl || '';

const apiPortNumber = process.env.apiPortNumber || '';

module.exports = {
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
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loaders: ['json-loader'],
      },
      {
        // string-replace loader is here to replace URL's mapped to /api in code
        test: /\.(js)$/,
        loader: 'string-replace-loader',
        exclude: /node_modules/,
        query: {
          search: '/api/',
          replace: apiUrl ? `${apiUrl}:${apiPortNumber}/api/` : '/api/',
          flags: 'g',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime', 'transform-decorators-legacy', 'styled-jsx/babel'],
          presets: ['es2015', 'es2016', 'es2017', 'react', 'stage-0'],
        },
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[local]',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[local]',
          'postcss-loader',
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
      {
        // loader for bootstrap
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        // loader for bootstrap
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        // loader for bootstrap
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'common.js',
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/app/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin([{ from: './assets/**/*' }]),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: 'localhost',
      analyzerPort: 8888,
      openAnalyzer: false,
    }),
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        target: 'https://saturn.slooh.com',
        changeOrigin: true,
        secure: true,
      },
      '/sloohapp/**': {
        target: 'https://saturn.slooh.com',
        changeOrigin: true,
        secure: true,
      },
      '/sse/**': {
        target: 'https://slooh.com',
        changeOrigin: true,
        secure: true,
      },
      '/sselog/**': {
        target: 'https://slooh.com',
        changeOrigin: true,
        secure: true,
      },
      '/util/**': {
        target: 'https://slooh.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
};
