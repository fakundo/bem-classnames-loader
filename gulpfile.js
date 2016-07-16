var gulp = require('gulp');
var gutil = require('gutil');
var webpack = require('webpack');
var nodemon = require('gulp-nodemon');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var statsConfig = {
  colors: true,
  chunks: false,
  modules: false,
  hash: false,
  version: false
};

gulp.task('examples:dist', function(cb) {
  var webpackConfig = require('./examples/webpack.config');
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString(statsConfig));
    cb();
  });
});

gulp.task('examples:dev', ['examples:dist'], function() {
  nodemon({
    watch: ['./lib', './examples/src'],
    tasks: ['examples:dist']
  });
});
