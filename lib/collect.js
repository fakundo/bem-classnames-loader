/**
 * Makes object, which contains classnames with modifiers and states
 */
module.exports = function(css, options) {

  // Find classnames + mixes .Class.is-active
  var classDefinitions = css.match(/\.-?[_a-zA-Z]+[._a-zA-Z0-9-]*[\s{]/g);

  var bemNames = new BemNames();

  classDefinitions.forEach(function(def) {

    // Remove spaces
    def = def.trim();

    // Classes
    var classNames = def.split('.');

    // States
    var states = [];
    var stateClasses = [];

    // Find states
    classNames.forEach(function(className) {

      // Pass if empty
      if (!className) return;

      // Test className is state
      var stateRegexp = new RegExp('^' + options.prefixes.state + '(.+)', 'i');
      var stateMatch = className.match(stateRegexp);
      if (stateMatch) {
        states.push(stateMatch[1]);
        return;
      }

      // Test className contains modifier
      var modifierRegexp = new RegExp('(.+?)' + options.prefixes.modifier + '(.+)', 'i');
      var modifierMatch = className.match(modifierRegexp);
      if (modifierMatch) {
        stateClasses.push(modifierMatch[1]);
        bemNames.addModifier(modifierMatch[1], modifierMatch[2]);
        return;
      }

      // Add class
      bemNames.addItem(className);
      stateClasses.push(className);

    });

    // Add states to each class in definition
    stateClasses.forEach(function(className) {
      states.forEach(function(state) {
        bemNames.addState(className, state);
      });
    });

  });

  return bemNames;
};

/**
 * Class for collecting modifiers and states
 */
function BemNames() {
  this.names = {};
}

BemNames.prototype = {

  addItem: function(name) {
    if (!this.names[name]) {
      this.names[name] = { name: name };
    }
    return this.names[name];
  },

  getItem: function(name) {
    return this.names[name];
  },

  addModifier: function(itemName, modifier) {
    var item = this.addItem(itemName);

    if (!item.modifiers) item.modifiers = [];

    if (!~item.modifiers.indexOf(modifier)) {
      item.modifiers.push(modifier);
    }
  },

  addState: function(itemName, state) {
    var item = this.addItem(itemName);

    if (!item.states) item.states = [];

    if (!~item.states.indexOf(state)) {
      item.states.push(state);
    }
  },

  toString() {
    var array = [];
    for (var name in this.names) {
      if (this.names.hasOwnProperty(name)) {
        array.push(this.names[name]);
      }
    }
    return JSON.stringify(array);
  }

};
