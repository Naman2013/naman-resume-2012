const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const WebpackMd5Hash = require('webpack-md5-hash');
const WebpackMd5Hash = Math.random() * 100000;

const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const apiUrl = process.env.apiUrl || '';
const apiPortNumber = process.env.apiPortNumber || '';
const cookieDomain = process.env.cookieDomain || '.slooh.com';

// console.log(apiUrl, apiPortNumber, cookieDomain);

// console.log(JSON.stringify(process.env.cookieDomain));

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sourcePath = path.join(__dirname, './app');
const outPath = path.join(__dirname, './dist');
const isProduction = process.env.NODE_ENV === 'production';
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  context: sourcePath,

  mode: 'production',

  devtool: 'source-map',
  entry: {
    // vendors: [
    //   'classnames',
    //   'cookie',
    //   'lodash',
    //   'moment',
    //   'moment-timezone',
    //   'axios',
    //   'react',
    //   'react-addons-css-transition-group',
    //   'react-dom',
    //   'react-draggable',
    //   'react-onclickoutside',
    //   'react-redux',
    //   'react-remarkable',
    //   'react-router',
    //   'react-router-redux',
    //   'react-scroll',
    //   'react-slick',
    //   'react-tabs',
    //   'react-tag-input',
    //   'redux',
    //   'redux-form',
    //   'redux-logger',
    //   'redux-thunk',
    // ],
    bundle: './index.js',
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: 'chunks/[name].[hash].chunk.js',
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, './app/'),
      assets: path.resolve(__dirname, './app/assets/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'string-replace-loader',
        exclude: /node_modules/,
        options: {
          multiple: [
            // string-replace loader is here to replace URL's mapped to /api in code
            {
              search: '/api/',
              replace: apiUrl ? `${apiUrl}:${apiPortNumber}/api/` : '/api/',
              flags: 'g',
            },
          ],
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
    // clean /dist before build
    new CleanWebpackPlugin(),

    // new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      cookieDomain: JSON.stringify(process.env.cookieDomain),
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendors',
    //   filename: 'common.js',
    // }),
    // new HtmlWebpackPlugin({
    //   template: `${__dirname}/app/index.html`,
    //   filename: 'index.html',
    //   inject: 'body',
    // }),
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    //   },
    // }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isProduction ? 'chunks/[name].[hash].css' : '[name].css',
      chunkFilename: isProduction ? 'chunks/[id].[hash].css' : '[id].css',
      disable: !isProduction,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        main: {
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
  },
};
