const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const apiUrl = process.env.apiUrl || '';

const apiPortNumber = process.env.apiPortNumber || '';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sourcePath = path.join(__dirname, './app');
const outPath = path.join(__dirname, './dist');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  context: sourcePath,
  mode: 'development',
  entry: {
    /*vendors: [
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
    ],*/
    bundle: './index.js',
  },
  // output: {
  //   path: `${__dirname}/dist`,
  //   publicPath: '/',
  //   filename: '[name].js',
  //   sourceMapFilename: '[name].js.map',
  // },
  output: {
    path: outPath,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, './app/'),
      assets: path.resolve(__dirname, './app/assets/'),
    },
  },
  // target: 'web', // Make web variables accessible to webpack, e.g. window
  module: {
    rules: [
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
      },
      {
        test: /\.scss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|svg)$/,
        use: 'url-loader?limit=10000',
        exclude: [/\.component\.svg$/],
      },
      { test: /\.(jpg|gif|eot|ttf|woff|woff2)$/, use: 'file-loader' },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new HtmlWebpackPlugin({
      inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
      template: `${__dirname}/app/index-dev.html`,
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      cookieDomain: JSON.stringify(process.env.cookieDomain),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isProduction ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProduction ? '[id].[hash].css' : '[id].css',
      disable: !isProduction,
    }),
  ],

  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-source-map',

  performance: {
    hints: false,
  },
  // devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: sourcePath, // assets
    hot: false,
    inline: false,
    open: true,
    overlay: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: {
      '/api/**': {
        target: 'https://eris.slooh.com',
        changeOrigin: true,
        secure: true,
      },
      '/sloohapp/**': {
        target: 'https://eris.slooh.com',
        changeOrigin: true,
        secure: true,
      },
      '/sse/**': {
        target: 'https://supernova.slooh.com',
        changeOrigin: true,
        secure: true,
      },
      '/bot/**': {
        target: 'https://supernova.slooh.com',
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
