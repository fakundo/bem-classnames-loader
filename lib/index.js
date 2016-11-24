var loaderUtils = require('loader-utils');

module.exports = function() {
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  //this.cacheable();
  var callback = this.async();

  require('./collect.compiler')(this, remainingRequest)
    .then(function(data) {

      var result = [
        '// Result of previous loaders, e.g. style-loader',
        'require(' + loaderUtils.stringifyRequest(this, '!!' + remainingRequest) + ');',
        'var cx = require(' + loaderUtils.stringifyRequest(this, makeCxRequest()) + ');',
        'var bemNames = ' + data.stringify() + ';',
        'var bemNamespace = ' + data.stringifyNamespace() + ';',
        'module.exports = cx(bemNames, bemNamespace);'
      ];

      callback(null, result.join('\n'));
    })
    .catch(callback);
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
