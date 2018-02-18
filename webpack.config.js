const localServer = {
  path: 'localhost/',
  port: 9000
};

const path = require('path');
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
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['.tmp']),
    new ExtractTextPlugin({
      filename: `styles/[name].css`,
      disable: process.env.NODE_ENV === 'development'
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
