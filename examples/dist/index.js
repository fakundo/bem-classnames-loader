/******/ (function(modules) { // webpackBootstrap
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

	/* WEBPACK VAR INJECTION */(function(global) {// Require style
	var style = __webpack_require__(1);
	
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// Result of previous loaders, e.g. style-loader
	var old = __webpack_require__(2);
	var cx = __webpack_require__(4);
	var bemNames = [{"name":"button","modifiers":["success"],"states":["disabled"]},{"name":"button__inner"}];
	module.exports = cx(bemNames);

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var cx = __webpack_require__(5);
	// This variable must be set by cx.loader.js
	var options;
	
	module.exports = function(bemNames) {
	
	  // Convert back to object
	  var bemNamesAssoc = {};
	  for (var i = 0; i < bemNames.length; i++) {
	    var item = bemNames[i];
	    bemNamesAssoc[item.name] = item;
	  }
	
	  // Find possible namespace
	  // and apply class prefix if represented
	  // in one loop
	  var namespace = '';
	  var elementRegexp = new RegExp('^(.+?)' + options.prefixes.element);
	  for (var name in bemNamesAssoc) {
	    if (bemNamesAssoc.hasOwnProperty(name)) {
	      // Simple criteria for finding ns:
	      // has inner class (eg. a__b)
	      if (!namespace) {
	        var elementMatch = name.match(elementRegexp);
	        if (elementMatch && (!namespace || bemNamesAssoc[elementMatch[1]])) {
	          namespace = elementMatch[1];
	        }
	      }
	      // Apply prefix
	      bemNamesAssoc[name].name = options.applyClassPrefix + name;
	    }
	  }
	
	  var inst = function(name) {
	
	    if (typeof name === 'string') {
	      // Namespace usage
	      name = name.replace(/^&/, namespace);
	      var obj = bemNamesAssoc[name] || { name: options.applyClassPrefix + name };
	      var args = [].slice.call(arguments, 1);
	      args.unshift(obj);
	      return cx.apply(null, args);
	    }
	
	    return cx.apply(null, arguments);
	  };
	
	  // Changes namespace
	  inst.ns = function(newNamespace) {
	    if (typeof newNamespace !== 'undefined') {
	      namespace = newNamespace;
	    }
	    return namespace;
	  };
	
	  // Adds modifier
	  inst.modifier = function(name, modifier) {
	    var item = bemNamesAssoc[name];
	    if (!item.modifiers) {
	      item.modifiers = [];
	    }
	    item.modifiers.push(modifier);
	  };
	
	  // Return names
	  inst.getNames = function() {
	    return bemNames;
	  };
	
	  return inst;
	};
	
	// Setting up cx by cx.loader.js
	options = {"applyClassPrefix":"","prefixes":{"element":"__","modifier":"--","state":"is-"}};
	cx.prefixes.modifiers = "{name}" + options.prefixes.modifier;
	cx.prefixes.states = options.applyClassPrefix + options.prefixes.state;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // AMD
	  } else if (typeof exports === 'object') {
	    module.exports = factory(); // CommonJS
	  } else {
	    global.cx = factory(); // Globals
	  }
	}(this, function() {
	  'use strict';
	
	  var prefixes = {
	    modifiers: '{name}--',
	    states: 'is-'
	  };
	
	  var push  = Array.prototype.push;
	  var slice = Array.prototype.slice;
	  var toString = Object.prototype.toString;
	
	  /**
	   * toType([]) -> 'array'
	   *
	   * @param {*} object
	   * @return {string}
	   */
	  function toType(object) {
	    return toString.call(object).slice(8, -1).toLowerCase();
	  }
	
	  /**
	   * is.array([]) -> true
	   *
	   * @param {*} object
	   * @return {string}
	   */
	  var is = {};
	  ['string', 'boolean', 'array', 'object'].forEach(function(type) {
	    is[type] = function(object) {
	      return toType(object) === type;
	    };
	  });
	
	  /**
	   * uniq(['a', 'b', 'a', 'b']) -> ['a', 'b']
	   *
	   * @param {Array} array
	   * @return {Array}
	   */
	  function uniq(array) {
	    return array.filter(function(el, i) {
	      return array.indexOf(el) === i;
	    });
	  }
	
	  /**
	   * exclude([null, undefined, 1, 0, true, false, '', 'a', ' b  ']) -> ['a', 'b']
	   *
	   * @param {Array} array
	   * @return {string[]}
	   */
	  function exclude(array) {
	    return array
	      .filter(function(el) {
	        return is.string(el) && el.trim() !== '';
	      })
	      .map(function(className) {
	        return className.trim();
	      });
	  }
	
	  /**
	   * split(' a  b  ') -> ['a', 'b']
	   *
	   * @param {string} className
	   * @return {string[]}
	   */
	  function split(className) {
	    return className.trim().split(/ +/);
	  }
	
	  /**
	   * toClassName(['a', 'b']) -> 'a b'
	   *
	   * @param {string[]} names
	   * @return {string}
	   */
	  function toClassName(names) {
	    return names.join(' ').trim();
	  }
	
	  /**
	   * detectPrefix('modifiers', { name: 'foo' }) -> 'foo--'
	   *
	   * @param {string} prefixName
	   * @param {Object} classes
	   * @return {string}
	   */
	  function detectPrefix(prefixName, classes) {
	    return (prefixes[prefixName] || '').replace(/\{([\w-]*?)\}/g, function (match, p1) {
	      return classes[p1] || '';
	    });
	  }
	
	  /**
	   * getClassNamesByProps(['a'], { a: 'foo' }, '-') -> [ '-foo' ]
	   *
	   * @param {string[]} propNames
	   * @param {Object} props
	   * @param {string} [prefix]
	   * @return {string[]}
	   */
	  function getClassNamesByProps(propNames, props, prefix) {
	    prefix = prefix || '';
	
	    return propNames
	      .filter(function(name) {
	        return !!props[name];
	      })
	      .map(function(name) {
	        return prefix + (is.boolean(props[name]) ? name : props[name]);
	      });
	  }
	
	  /**
	   * @param {Object} classes
	   * @param {...Object|string} [props|className]
	   * @return {string}
	   */
	  function cx(classes/* , [...props|className] */) {
	    if (!classes) {
	      return '';
	    }
	
	    var args = slice.call(arguments).slice(1);
	    var classNames = [];
	
	    Object.keys(classes).forEach(function(name) {
	      switch (toType(classes[name])) {
	        case 'string':
	          push.apply(classNames, split(classes[name]));
	          break;
	        case 'array':
	          args.forEach(function (arg) {
	            if (is.object(arg)) {
	              var names = getClassNamesByProps(classes[name], arg, detectPrefix(name, classes));
	              push.apply(classNames, names);
	            }
	          });
	          break;
	        default:
	      }
	    });
	
	    args.forEach(function (arg) {
	      switch (toType(arg)) {
	        case 'string':
	          push.apply(classNames, split(arg));
	          break;
	        case 'array':
	          push.apply(classNames, arg);
	          break;
	        default:
	      }
	    });
	
	    return toClassName(exclude(uniq(classNames)));
	  }
	
	  cx.prefixes = prefixes;
	
	  return cx;
	}));


/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map