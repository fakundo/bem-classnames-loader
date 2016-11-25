// Options must be provided by cxLoader.js
// eslint-disable-next-line no-undef
var opts = options;
var cx = require('bem-classnames');
cx.prefixes.modifiers = '{name}' + opts.prefixes.modifier;
cx.prefixes.states = opts.applyClassPrefix + opts.prefixes.state;

module.exports = function(data) {
  var bemNames = data.names;
  var bemNamespace = data.namespace;

  // Add name property and apply class prefix
  for (var name in bemNames) {
    if (bemNames.hasOwnProperty(name)) {
      bemNames[name].name = opts.applyClassPrefix + name;
    }
  }

  var inst = function(name) {

    if (typeof name === 'string') {
      // Namespace usage
      name = name.replace(new RegExp('^&(.+)'), bemNamespace + opts.prefixes.element + '$1');
      name = name.replace(/^&/, bemNamespace);
      var obj = bemNames[name] || { name: opts.applyClassPrefix + name };
      var args = [].slice.call(arguments, 1);
      args.unshift(obj);
      return cx.apply(null, args);
    }

    return cx.apply(null, arguments);
  };

  // Changes namespace
  inst.ns = function(newNamespace) {
    if (typeof newNamespace !== 'undefined') {
      bemNamespace = newNamespace;
    }
    return bemNamespace;
  };

  // Adds modifier
  inst.modifier = function(name, modifier) {
    var item = bemNames[name];
    if (!item.modifiers) {
      item.modifiers = [];
    }
    item.modifiers.push(modifier);
  };

  // Return names
  inst.getNames = function() {
    return bemNames;
  };

  return inst;
};
