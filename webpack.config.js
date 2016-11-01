const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const apiUrl = process.env.apiUrl || '';
const apiPortNumber = process.env.apiPortNumber || '';

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
      '/:3004/**': {
        target: 'https://mars.slooh.com:3004',
        changeOrigin: true,
        secure: true,
        pathRewrite: { '/:3004/': '' },
      },
      '/:3101/**': {
        target: 'https://mars.slooh.com:3101',
        changeOrigin: true,
        secure: true,
        pathRewrite: { '/:3101/': '' },
      },
      '/:3002/**': {
        target: 'https://mars.slooh.com:3002',
        changeOrigin: true,
        secure: true,
        pathRewrite: { '/:3002/': '' },
      },
      '/:3105/**': {
        target: 'https://mars.slooh.com:3105',
        changeOrigin: true,
        secure: true,
        pathRewrite: { '/:3105/': '' },
      },
      '/:3102/**': {
        target: 'https://mars.slooh.com:3102',
        changeOrigin: true,
        secure: true,
        pathRewrite: { '/:3102/': '' },
      },
      '/:3103/**': {
        target: 'https://mars.slooh.com:3103',
        changeOrigin: true,
        secure: true,
        pathRewrite: { '/:3103/': '' },
      },
      '/:3104/**': {
        target: 'https://mars.slooh.com:3104',
        changeOrigin: true,
        secure: true,
        pathRewrite: { '/:3104/': '' },
      },
      '/:3001/**': {
        target: 'https://mars.slooh.com:3001',
        changeOrigin: true,
        secure: true,
        pathRewrite: { '/:3001/': '' },
      },
      '/:3005/**': {
        target: 'https://mars.slooh.com:3005',
        changeOrigin: true,
        secure: true,
        pathRewrite: { '/:3005/': '' },
      },
      '/:0/**': {
        target: 'https://mars.slooh.com:0',
        changeOrigin: true,
        secure: true,
        pathRewrite: { '/:0/': '' },
      },
      '/util/**': {
        target: 'https://mars.slooh.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
};
