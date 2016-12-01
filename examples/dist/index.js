(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Require style
	var style = __webpack_require__(1);
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// bem-classnames-loader: extracts bem modifiers and states from CSS files
	// Result of previous loaders, e.g. style-loader
	__webpack_require__(2);
	var cx = __webpack_require__(4);
	var bem = __webpack_require__(5);
	module.exports = cx(bem);

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	
	// BEM options by cxLoader.js
	var options = {"applyClassPrefix":"","prefixes":{"element":"__","modifier":"--","state":"is-","modifierValue":"-","stateValue":"-"}};
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


/***/ },
/* 5 */
/***/ function(module, exports) {

	// BEM classnames by parserLoader.js
	module.exports = {
	 classes: {"button":{"modifiers":{"borderless":[],"type":["default","success"]},"states":{"disabled":[]}},"button__inner":{}},
	 namespace: "button"
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map