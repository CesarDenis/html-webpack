const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/scripts/main.js']
  },
  output: {
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, '.tmp'),
    publicPath: '/'
  },
  plugins: [new CleanWebpackPlugin(['.tmp'])]
};
