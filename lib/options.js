var utils = require('./utils');
var loaderUtils = require('loader-utils');
var getLoaderConfig = loaderUtils.getLoaderConfig;

module.exports = function(loader) {
  var prefixes = {
    element: '__',
    modifier: '--',
    state: 'is-',
    modifierValue: '-',
    stateValue: '-'
  };

  var options = {
    applyClassPrefix: '',
    prefixes: {}
  };

  var loaderOptions = getLoaderConfig(loader, 'bemClassnames');
  utils.extend(options, loaderOptions);
  options.prefixes = utils.extend(prefixes, options.prefixes);
  return options;
};
