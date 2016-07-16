// Require style
var style = require('./index.scss');

// Test in browser
if (typeof window !== 'undefined') {
  var button = document.createElement('button');
  var buttonInner = document.createElement('div')
  buttonInner.innerHTML = 'Click me';
  button.appendChild(buttonInner);

  // Magic here
  button.className = style('button');
  buttonInner.className = style('&__inner'); // Takes namespace as &
  button.onclick = function() {
    this.className = style('button', { disabled: true, success: true });
  };

  document.body.appendChild(button);
}

// Export for mocha tests
if (typeof global !== 'undefined') {
  global.style = style;
}
