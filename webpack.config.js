const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js'],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 500000,
    maxAssetSize: 800000,
  },
  module: {
  },
};
