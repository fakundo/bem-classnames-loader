/**
 * Makes object, which contains classnames with modifiers and states
 */
module.exports = function(css, options) {

  var parseResult = new ParseResult(options);

  // Remove comments
  css = css.replace(/\/\*[\s\S]*?\*\//gim, '');
  // And strings
  css = css.replace(/("|')(\\.|.)*?\1/gim, '');

  // Find classnames + mixes .Class.is-active
  var classDefinitionRegexp = /(\.-?[_a-zA-Z]+[\._a-zA-Z0-9-]*)[\s{,:]/gm;

  while(def = classDefinitionRegexp.exec(css)) {

    def = def[1];

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
        parseResult.addModifier(modifierMatch[1], modifierMatch[2]);
        return;
      }

      // Add class
      parseResult.addItem(className);
      stateClasses.push(className);

    });

    // Add states to each class in definition
    stateClasses.forEach(function(className) {
      states.forEach(function(state) {
        parseResult.addState(className, state);
      });
    });

  }

  return parseResult;
};

/**
 * Class for collecting modifiers and states
 */
function ParseResult(options) {
  this.names = {};
  this.namesList = [];
  this.options = options;
}

ParseResult.prototype = {

  addItem: function(name) {
    if (!this.names[name]) {
      this.names[name] = {};
      this.namesList.push(name);
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

  getNamespace() {
    var firstClassname = '';
    var namespace = '';
    var elementRegexp = new RegExp('^(.+?)' + this.options.prefixes.element);
    for (var i = 0; i < this.namesList.length; i++) {
      // Find namespace by child class, eg a__b
      var elementMatch = this.namesList[i].match(elementRegexp);
      if (elementMatch && (!namespace || this.names[elementMatch[1]])) {
        namespace = elementMatch[1];
        break;
      }
      // Find first class which is not a__b
      else if (!firstClassname) {
        firstClassname = this.namesList[i];
      }
    }
    if (!namespace) {
      return firstClassname;
    }
    return namespace;
  },

  getNames() {
    return this.names;
  }

};
