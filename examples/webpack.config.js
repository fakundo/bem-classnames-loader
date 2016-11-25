var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var bemClassnames = path.join(__dirname, '/../lib/index.js');

module.exports = {
  entry: path.join(__dirname, 'src', 'index'),
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
    publicPath: ''
  },
  plugins: [
    new ExtractTextPlugin('index.css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        //loader: bemClassnames + '!style!css!sass'
        loaders: [bemClassnames, ExtractTextPlugin.extract('css!sass')]
      }
    ]
  }
};
