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
	  button.className = style('button', { default: true });
	  buttonInner.className = style('&inner'); // Takes namespace as &
	  button.onclick = function() {
	    this.className = style('button', { disabled: true, success: true });
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
	var bem = __webpack_require__(6);
	module.exports = cx(bem);

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	// BEM options by cxLoader.js
	var options = {"applyClassPrefix":"","prefixes":{"element":"__","modifier":"--","state":"is-"}};
	// Options must be provided by cxLoader.js
	// eslint-disable-next-line no-undef
	var opts = options;
	var cx = __webpack_require__(5);
	cx.prefixes.modifiers = '{name}' + opts.prefixes.modifier;
	cx.prefixes.states = opts.applyClassPrefix + opts.prefixes.state;
	
	module.exports = function(data) {
	  var bemNames = data.names;
	  var bemNamespace = data.namespace;
	
	  // Add name property and apply class prefix
	  for (var name in bemNames) {
	    if (bemNames.hasOwnProperty(name)) {
	      bemNames[name].name = opts.applyClassPrefix + name;
	    }
	  }
	
	  var inst = function(name) {
	
	    if (typeof name === 'string') {
	      // Namespace usage
	      name = name.replace(new RegExp('^&(.+)'), bemNamespace + opts.prefixes.element + '$1');
	      name = name.replace(/^&/, bemNamespace);
	      var obj = bemNames[name] || { name: opts.applyClassPrefix + name };
	      var args = [].slice.call(arguments, 1);
	      args.unshift(obj);
	      return cx.apply(null, args);
	    }
	
	    return cx.apply(null, arguments);
	  };
	
	  // Changes namespace
	  inst.ns = function(newNamespace) {
	    if (typeof newNamespace !== 'undefined') {
	      bemNamespace = newNamespace;
	    }
	    return bemNamespace;
	  };
	
	  // Adds modifier
	  inst.modifier = function(name, modifier) {
	    var item = bemNames[name];
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


/***/ },
/* 6 */
/***/ function(module, exports) {

	// BEM names by parserLoader.js
	module.exports = {
	 names: {"button":{"modifiers":["default","success"],"states":["disabled"]},"button__inner":{}},
	 namespace: "button"
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map