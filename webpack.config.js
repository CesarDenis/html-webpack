const localServer = {
  path: 'localhost/',
  port: 9000
};

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/scripts/main.js']
  },
  output: {
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, '.tmp'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(['.tmp']),
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
