module.exports = function(source) {
  // Execute source and get CSS code
  var result = this.exec(source, this.resource);

  // Loader options
  var options = require('./options')(this);

  // Bem names
  var parser = require('./parser')(result.toString(), options);

  return [
    '// BEM names by parserLoader.js',
    'module.exports = {',
    ' names: ' + JSON.stringify(parser.getNames()) + ',',
    ' namespace: ' + JSON.stringify(parser.getNamespace()),
    '};'
  ].join('\n');
};
