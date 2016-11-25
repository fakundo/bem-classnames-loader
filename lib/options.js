var loaderUtils = require('loader-utils');
var getLoaderConfig = loaderUtils.getLoaderConfig;

module.exports = function(loader) {
  var prefixes = {
    element: '__',
    modifier: '--',
    state: 'is-'
  };

  var options = {
    applyClassPrefix: '',
    prefixes: {}
  };

  var loaderOptions = getLoaderConfig(loader, 'bemClassnames');
  Object.assign(options, loaderOptions);
  options.prefixes = Object.assign(prefixes, options.prefixes);

  return options;
};
