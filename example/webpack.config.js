const path = require('path');

const distFolder = path.resolve(__dirname, 'dist');
const root = path.resolve(__dirname, 'src');

module.exports = {
  entry: path.join(root, 'index.jsx'),
  output: {
    path: distFolder,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react'],
          },
        },
      },
    ],
  },
  resolve: {
    modules: [root,'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  }
};