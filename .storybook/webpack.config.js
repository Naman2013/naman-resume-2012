// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const apiUrl = process.env.apiUrl || '';
const apiPortNumber = process.env.apiPortNumber || '';

module.exports = {
  plugins: [

  ],
  module: {
    loaders: [
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
};
