module.exports = function(source) {
  // Loader options
  var options = require('./options')(this);

  var add = [
    '',
    '// BEM options by cxLoader.js',
    'var options = ' + JSON.stringify(options) + ';'
  ];

  return add.join('\n') + '\n' + source;
};
