var SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
var LibraryTemplatePlugin = require('webpack/lib/LibraryTemplatePlugin');
var LimitChunkCountPlugin = require('webpack/lib/optimize/LimitChunkCountPlugin');

module.exports = function(loader, remainingRequest) {
  // Remove loaders before css-loader
  var request = makeRequest(remainingRequest);
  var childCompilerFilename = 'bem-classnames-loader';
  var outputOptions = {
    filename: childCompilerFilename,
    publicPath: loader._compilation.outputOptions.publicPath
  };

  var childCompiler = loader._compilation.createChildCompiler('bem-classnames-loader', outputOptions);

  childCompiler.apply(new SingleEntryPlugin(this.context, request));
  childCompiler.apply(new LibraryTemplatePlugin(null, 'commonjs2'));
  childCompiler.apply(new LimitChunkCountPlugin({ maxChunks: 1 }));

  // Create source and remove files
  var source;
  childCompiler.plugin('after-compile', function(compilation, callback) {
    source = compilation.assets[childCompilerFilename] &&
             compilation.assets[childCompilerFilename].source();

    // Remove all chunk assets
    compilation.chunks.forEach(function(chunk) {
      chunk.files.forEach(function(file) {
        delete compilation.assets[file];
      });
    });
    callback();
  });

  return new Promise(function(resolve, reject) {
    childCompiler.runAsChild(function(err, entries, compilation) {
      if (err) {
        return reject(err);
      }

      if (compilation.errors.length > 0) {
        return reject(compilation.errors[0]);
      }

      // Get result
      var result = loader.exec(source, request);

      // Loader options
      var options = require('./options')(loader);

      // Bem names
      var bemNames = require('./collect')(result.toString(), options);

      resolve(bemNames);
    });
  });
};

/**
 * Makes request starting with css-loader
 */
function makeRequest(remainingRequest) {

  // Remove loaders before css-loader
  var request = remainingRequest.split('!');
  var cssLoaderIndex = request.findIndex(function (loader) {
    return /css-loader/i.test(loader) ||
           /^css$/i.test(loader);
  });
  request = request.slice(cssLoaderIndex);

  return '!!' + request.join('!');
}
