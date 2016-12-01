module.exports = function(source) {
  // Execute source and get CSS code
  var css = this.exec(source, this.resource);

  // Loader options
  var options = require('./options')(this);

  // Bem classnames
  var Parser = require('./parser');
  var parser = new Parser(options);
  var parseResult = parser.run(css.toString());

  return [
    '// BEM classnames by parserLoader.js',
    'module.exports = {',
    ' classes: ' + JSON.stringify(parseResult.getClasses()) + ',',
    ' namespace: ' + JSON.stringify(parseResult.getNamespace()),
    '};'
  ].join('\n');
};
