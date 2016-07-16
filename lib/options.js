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

  var loaderOptions = loader.options.bemClassnames;
  Object.assign(options, loaderOptions);
  options.prefixes = Object.assign(prefixes, loaderOptions.prefixes);

  return options;
};
