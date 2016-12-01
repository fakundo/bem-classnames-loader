var utils = require('./utils');

/**
 * Class for collecting modifiers and states
 */
function ParseResult(options) {
  this.classes = {};
  this.options = options;
}

ParseResult.prototype = {

  getClass: function(className) {
    return this.classes[className];
  },

  getModifier: function(className, modifierName) {
    var classItem = this.getClass(className);
    return classItem.modifiers[modifierName];
  },

  getState: function(className, stateName) {
    var classItem = this.getClass(className);
    return classItem.states[stateName];
  },

  addClass: function(className) {
    if (!this.getClass(className)) {
      this.classes[className] = { modifiers: {}, states: {} };
    }
  },

  addModifier: function(className, modifierName) {
    if (!this.getModifier(className, modifierName)) {
      var classItem = this.getClass(className);
      classItem.modifiers[modifierName] = [];
    }
  },

  addState: function(className, stateName) {
    if (!this.getState(className, stateName)) {
      var classItem = this.getClass(className);
      classItem.states[stateName] = [];
    }
  },

  addModifierValue: function(className, modifierName, value) {
    var modifier = this.getModifier(className, modifierName);
    if (!utils.inArray(modifier, value)) {
      modifier.push(value);
    }
  },

  addStateValue: function(className, stateName, value) {
    var state = this.getState(className, stateName);
    if (!utils.inArray(state, value)) {
      state.push(value);
    }
  },

  getNamespace() {
    var namespace;
    var classNames = Object.keys(this.classes);
    var elementRegexp = new RegExp('^(.+?)' + this.options.prefixes.element);
    for (var i = 0; i < classNames.length; i++) {
      // Find namespace by child class, eg a__b
      var elementMatch = classNames[i].match(elementRegexp);
      if (elementMatch && (!namespace || this.classes[elementMatch[1]])) {
        namespace = elementMatch[1];
        break;
      }
    }
    if (!namespace) {
      return classNames[0];
    }
    return namespace;
  },

  cleanClasses() {
    utils.each(this.classes, function(classItem) {
      utils.each(classItem, function(prop, propName) {
        if (utils.isEmpty(prop)) {
          delete classItem[propName];
        }
      });
    });
    return this.classes;
  },

  getClasses() {
    return this.cleanClasses();
  }

};

function Parser(options) {
  this.options = options;
  this.parseResult = new ParseResult(options);
}

Parser.prototype = {

  cleanCSS(css) {
    // Remove comments
    css = css.replace(/\/\*[\s\S]*?\*\//gim, '');
    // And strings
    css = css.replace(/("|')(\\.|.)*?\1/gim, '');
    return css;
  },

  matchClass(className) {
    var classRegexp = new RegExp('^' + this.options.applyClassPrefix + '(.+)', 'i');
    var classMatch = className.match(classRegexp);
    if (classMatch) {
      return { class: classMatch[1] };
    }
    return null;
  },

  matchState(className) {
    var stateRegexp = new RegExp('^' + this.options.prefixes.state + '(.+)', 'i');
    var stateMatch = className.match(stateRegexp);
    if (stateMatch) {
      return { state: stateMatch[1] };
    }
    return null;
  },

  matchModifier(className) {
    var modifierRegexp = new RegExp('(.+?)' + this.options.prefixes.modifier + '(.+)', 'i');
    var modifierMatch = className.match(modifierRegexp);
    if (modifierMatch) {
      return { class: modifierMatch[1], modifier: modifierMatch[2] };
    }
    return null;
  },

  matchModifierValue(modifier) {
    var modifierValueRegexp = new RegExp('(.+?)' + this.options.prefixes.modifierValue + '(.+)', 'i');
    var modifierValueMatch = modifier.match(modifierValueRegexp);
    if (modifierValueMatch) {
      return { modifier: modifierValueMatch[1], value: modifierValueMatch[2] };
    }
    return null;
  },

  matchStateValue(state) {
    var stateValueRegexp = new RegExp('(.+?)' + this.options.prefixes.stateValue + '(.+)', 'i');
    var stateValueMatch = state.match(stateValueRegexp);
    if (stateValueMatch) {
      return { state: stateValueMatch[1], value: stateValueMatch[2] };
    }
    return null;
  },

  processClassDefinition(definition) {
    var that = this;

    // Classes
    var classNames = definition.split('.');

    // States
    var states = [];
    var stateClasses = [];

    // Find states
    classNames.forEach(function(className) {

      // Test classname prefix
      var matchClass = that.matchClass(className);
      if (!matchClass) {
        return;
      }
      className = matchClass.class;

      // Test className is state
      var stateMatch = that.matchState(className);
      if (stateMatch) {
        states.push(stateMatch.state);
        return;
      }

      // Test className contains modifier
      var modifierMatch = that.matchModifier(className);
      if (modifierMatch) {
        // Save class to apply states
        stateClasses.push(modifierMatch.class);
        that.parseResult.addClass(modifierMatch.class);
        // Test modifier has name and value
        var modifierValueMatch = that.matchModifierValue(modifierMatch.modifier);
        if (modifierValueMatch) {
          that.parseResult.addModifier(modifierMatch.class, modifierValueMatch.modifier);
          that.parseResult.addModifierValue(modifierMatch.class, modifierValueMatch.modifier, modifierValueMatch.value);
        }
        else {
          that.parseResult.addModifier(modifierMatch.class, modifierMatch.modifier);
        }
        return;
      }

      // Simply add class
      stateClasses.push(className);
      that.parseResult.addClass(className);
    });

    // Add states to each class in definition
    stateClasses.forEach(function(className) {
      states.forEach(function(state) {
        that.parseResult.addClass(className);
        // Test state has name and value
        var stateValueMatch = that.matchStateValue(state);
        if (stateValueMatch) {
          that.parseResult.addState(className, stateValueMatch.state);
          that.parseResult.addStateValue(className, stateValueMatch.state, stateValueMatch.value);
        }
        else {
          that.parseResult.addState(className, state);
        }
      });
    });
  },

  run: function(css) {
    // Find classnames + mixes .Class.is-active
    var classDefinitionRegexp = /(\.-?[_a-zA-Z]+[\._a-zA-Z0-9-]*)[\s{,:]/gm;
    var definition;
    while((definition = classDefinitionRegexp.exec(this.cleanCSS(css)))) {
      this.processClassDefinition(definition[1]);
    }
    return this.parseResult;
  }

};

module.exports = Parser;
