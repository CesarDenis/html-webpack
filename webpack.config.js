const localServer = {
  path: 'localhost/',
  port: 9000
};

const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/scripts/main.js', './src/styles/main.scss']
  },
  output: {
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, '.tmp'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: 'eslint-loader'
      },
      {
        enforce: 'pre',
        test: /\.(js|s?[ca]ss)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'import-glob'
      },
      {
        test: /\.js$/,
        exclude: [/node_modules(?![/|\\](bootstrap|foundation-sites))/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                config: { path: __dirname }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['.tmp']),
    new ExtractTextPlugin({
      filename: `styles/[name].css`,
      disable: process.env.NODE_ENV === 'development'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: 'popper.js/dist/umd/popper.js'
    }),
    new BrowserSyncPlugin({
      host: localServer.path,
      port: localServer.port,
      server: { baseDir: ['.tmp', 'src'] },
      files: ['**/*.html'],
      injectChanges: true,
      logFileChanges: true,
      logLevel: 'debug',
      logPrefix: 'wepback',
      notify: true,
      reloadDelay: 0
    })
  ]
};
