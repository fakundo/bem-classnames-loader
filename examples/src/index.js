// Require style
var style = require('./index.scss');

// Watch in browser
if (typeof window !== 'undefined') {
  var status = document.createElement('div');
  var button = document.createElement('button');
  var buttonInner = document.createElement('div');
  buttonInner.innerHTML = 'Click me';
  button.appendChild(buttonInner);

  // Magic here
  button.className = style('button', { type: 'default' });
  buttonInner.className = style('&inner'); // Takes namespace as &
  button.onclick = function() {
    this.className = style('button', { type: 'success', disabled: true });
    status.innerHTML = button.className;
  };

  status.style.marginTop = '20px';
  status.innerHTML = button.className;

  document.body.appendChild(button);
  document.body.appendChild(status);
}

// Export style for auto tests
module.exports = style;
