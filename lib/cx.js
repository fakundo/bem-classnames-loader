var cx = require('bem-classnames');
// This variable must be set by cx.loader.js
var options;

module.exports = function(bemNames) {

  // Convert back to object
  var bemNamesAssoc = {};
  for (var i = 0; i < bemNames.length; i++) {
    var item = bemNames[i];
    bemNamesAssoc[item.name] = item;
  }

  // Find possible namespace
  // and apply class prefix if represented
  // in one loop
  var namespace = '';
  var elementRegexp = new RegExp('^(.+?)' + options.prefixes.element);
  for (var name in bemNamesAssoc) {
    if (bemNamesAssoc.hasOwnProperty(name)) {
      // Simple criteria for finding ns:
      // has inner class (eg. a__b)
      if (!namespace) {
        var elementMatch = name.match(elementRegexp);
        if (elementMatch && bemNamesAssoc[elementMatch[1]]) {
          namespace = elementMatch[1];
        }
      }
      // Apply prefix
      bemNamesAssoc[name].name = options.applyClassPrefix + name;
    }
  }

  var inst = function(name) {

    if (typeof name === 'string') {
      // Namespace usage
      name = name.replace(/^&/, namespace);
      var obj = bemNamesAssoc[name] || { name: options.applyClassPrefix + name };
      var args = [].slice.call(arguments, 1);
      args.unshift(obj);
      return cx.apply(null, args);
    }

    return cx.apply(null, arguments);
  };

  // Changes namespace
  inst.ns = function(newNamespace) {
    if (typeof newNamespace !== 'undefined') {
      namespace = newNamespace;
    }
    return namespace;
  };

  // Adds modifier
  inst.modifier = function(name, modifier) {
    var item = bemNamesAssoc[name];
    if (!item.modifiers) {
      item.modifiers = [];
    }
    item.modifiers.push(modifier);
  };

  return inst;
};
