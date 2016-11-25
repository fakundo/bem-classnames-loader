var loaderUtils = require('loader-utils');
var stringifyRequest = loaderUtils.stringifyRequest;

module.exports = function() {};

module.exports.pitch = function(remainingRequest) {
  if (this.cacheable) this.cacheable();
  var callback = this.async();

  var result = [
    '// bem-classnames-loader: extracts bem modifiers and states from CSS files',
    '// Result of previous loaders, e.g. style-loader',
    'require(' + stringifyRequest(this, '!!' + remainingRequest) + ');',
    'var cx = require(' + stringifyRequest(this, makeCxLoaderRequest()) + ');',
    'var bem = require(' + stringifyRequest(this, makeParserLoaderRequest(remainingRequest)) + ');',
    'module.exports = cx(bem);'
  ];

  callback(null, result.join('\n'));
};

function makeCxLoaderRequest() {
  return '!!' + [
    require.resolve('./cxLoader'),
    require.resolve('./cx')
  ].join('!');
}

function makeParserLoaderRequest(remainingRequest) {
  // We don't need loaders before css-loader
  var request = remainingRequest.split('!');
  var cssLoaderIndex = request.findIndex(function (loader) {
    return /css-loader/i.test(loader) ||
           /^css$/i.test(loader);
  });
  request = request.slice(cssLoaderIndex);

  return '!!' + [
    require.resolve('./parserLoader')
  ].concat(request).join('!');
}
