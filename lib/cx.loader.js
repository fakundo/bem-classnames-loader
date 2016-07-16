module.exports = function(source) {

  var options = require('./options')(this);

  var add = [
    '',
    '// Setting up cx by cx.loader.js',
    'options = ' + JSON.stringify(options) + ';',
    'cx.prefixes.modifiers = "{name}" + options.prefixes.modifier;',
    'cx.prefixes.states = options.applyClassPrefix + options.prefixes.state;'
  ];

  return source + add.join('\n');
};
