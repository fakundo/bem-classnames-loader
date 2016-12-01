// Options must be defined by cxLoader.js
/* global options */

function compactAndUnique(array) {
  return array.filter(function(value, index, self) {
    return !!value && self.indexOf(value) === index;
  });
}

function reduce(obj, iteratee, acc) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      acc = iteratee(acc, obj[key], key);
    }
  }
  return acc;
}

function inArray(array, item) {
  return !!~array.indexOf(item);
}

module.exports = function(bem) {

  function hasBemNames(className) {
    return !!bem.classes[className];
  }

  function getBemModifier(className, propName) {
    var bemClassname = bem.classes[className];
    return bemClassname.modifiers && bemClassname.modifiers[propName];
  }

  function getBemState(className, propName) {
    var bemClassname = bem.classes[className];
    return bemClassname.states && bemClassname.states[propName];
  }

  function applyClassPrefix(className) {
    return options.applyClassPrefix + className;
  }

  function canApplyBooleanModifier(className, propName, propValue) {
    var bemModifier = getBemModifier(className, propName);
    return propValue === true && !!bemModifier;
  }

  function applyBooleanModifier(className, propName, propValue) {
    return canApplyBooleanModifier(className, propName, propValue) ?
      applyClassPrefix(className + options.prefixes.modifier + propName) :
      '';
  }

  function canApplyStringModifier(className, propName, propValue) {
    var bemModifier = getBemModifier(className, propName);
    return !!bemModifier && inArray(bemModifier, propValue);
  }

  function applyStringModifier(className, propName, propValue) {
    return canApplyStringModifier(className, propName, propValue) ?
      applyClassPrefix(className + options.prefixes.modifier + propName + options.prefixes.modifierValue + propValue.toString()) :
      '';
  }

  function canApplyBooleanState(className, propName, propValue) {
    var bemState = getBemState(className, propName);
    return propValue === true && !!bemState;
  }

  function applyBooleanState(className, propName, propValue) {
    return canApplyBooleanState(className, propName, propValue) ?
      applyClassPrefix(options.prefixes.state + propName) :
      '';
  }

  function canApplyStringState(className, propName, propValue) {
    var bemState = getBemState(className, propName);
    return !!bemState && inArray(bemState, propValue);
  }

  function applyStringState(className, propName, propValue) {
    return canApplyStringState(className, propName, propValue) ?
      applyClassPrefix(options.prefixes.state + propName + options.prefixes.stateValue + propValue.toString()) :
      '';
  }

  function applyProp(className, propName, propValue) {
    var result = [];
    if (typeof propValue === 'boolean') {
      result.push(applyBooleanModifier(className, propName, propValue));
      result.push(applyBooleanState(className, propName, propValue));
    }
    else {
      result.push(applyStringModifier(className, propName, propValue));
      result.push(applyStringState(className, propName, propValue));
    }
    return result;
  }

  function applyProps(className, props) {
    if (hasBemNames(className)) {
      return reduce(props, function(acc, propValue, propName) {
        return acc.concat(applyProp(className, propName, propValue));
      }, []);
    }
    return [];
  }

  function applyNamespace(className) {
    return className
      .replace(new RegExp('^&(.+)'), bem.namespace + options.prefixes.element + '$1')
      .replace(/^&/, bem.namespace);
  }

  function processClassname(className, args) {
    className = applyNamespace(className);
    return reduce(args, function(acc, arg) {
      switch (typeof arg) {
        case 'object':
          return acc.concat(applyProps(className, arg));
        default:
          return acc.concat([arg.toString()]);
      }
    }, [ applyClassPrefix(className) ]);
  }

  // Main function
  function cx(classNames) {
    var args = [].slice.call(arguments, 1);

    if (typeof classNames === 'string') {
      classNames = [classNames];
    }

    var result = reduce(classNames, function(acc, className) {
      return acc.concat(processClassname(className, args));
    }, []);

    return compactAndUnique(result).join(' ');
  }

  // Changes namespace
  cx.ns = function(newNamespace) {
    if (typeof newNamespace !== 'undefined') {
      bem.namespace = newNamespace;
    }
    return bem.namespace;
  };

  // Adds modifier
  cx.modifier = function(className, modifier, values) {
    var classItem = cx.class(className);
    if (!classItem.modifiers) {
      classItem.modifiers = {};
    }
    classItem.modifiers[modifier] = (classItem.modifiers[modifier] || []).concat(values || []);
  };

  // Adds state
  cx.state = function(className, state, values) {
    var classItem = cx.class(className);
    if (!classItem.states) {
      classItem.states = {};
    }
    classItem.states[state] = (classItem.states[state] || []).concat(values || []);
  };

  // Adds class
  cx.class = function(className) {
    if (!bem.classes[className]) {
      bem.classes[className] = {};
    }
    return bem.classes[className];
  };

  // Return classes
  cx.getClasses = function() {
    return bem.classes;
  };

  return cx;
};
