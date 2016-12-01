var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index'),
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    publicPath: ''
  },
  plugins: [
    new ExtractTextPlugin('index.css'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        //loader: bemClassnames + '!style!css!sass'
        loaders: [
          path.resolve(__dirname, '../lib/index.js'),
          ExtractTextPlugin.extract('css!sass')
        ],
      }
    ]
  }
};
