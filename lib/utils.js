var utils = {

  inArray: function(array, item) {
    return !!~array.indexOf(item);
  },

  isEmpty: function(obj) {
    return Object.keys(obj).length === 0;
  },

  each: function(collection, iteratee) {
    Object.keys(collection).map(function(key) {
      iteratee(collection[key], key);
    });
  },

  extend: function(obj) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function(source) {
      utils.each(source, function(prop, propName) {
        obj[propName] = prop;
      });
    });
    return obj;
  },

  findIndex: function(collection, match) {
    for (var key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (match(collection[key], key)) {
          return key;
        }
      }
    }
  }

};

module.exports = utils;
