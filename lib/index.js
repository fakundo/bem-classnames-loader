var loaderUtils = require('loader-utils');

// TODO
// addDependency
// cacheable

module.exports = function() {
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {

  var callback = this.async();

  require('./collect.compiler')(this, remainingRequest)
    .then(function(data) {

      var result = [
        '// Result of previous loaders, e.g. style-loader',
        'var old = require(' + loaderUtils.stringifyRequest(this, '!!' + remainingRequest) + ');',
        'var cx = require(' + loaderUtils.stringifyRequest(this, makeCxRequest()) + ');',
        'var bemNames = ' + data.toString() + ';',
        'module.exports = cx(bemNames);'
      ];

      callback(null, result.join('\n'));
    });
};

/**
 * Makes request to cx via our loader
 */
function makeCxRequest() {
  return '!!' + [
    require.resolve('./cx.loader'),
    require.resolve('./cx')
  ].join('!');
}
