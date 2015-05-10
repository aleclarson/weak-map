(function() {
  var NamedFunction, WeakMap, _generateName, _uniqueId;

  require("lotus-require");

  NamedFunction = require("named-function");

  WeakMap = module.exports = NamedFunction("WeakMap", function() {
    if (!(this instanceof WeakMap)) {
      return new WeakMap;
    }
    this.name = _generateName();
    return this;
  });

  WeakMap.prototype.set = function(key, value) {
    var entry;
    entry = key[this.name];
    if ((entry != null) && entry[0] === key) {
      entry[1] = value;
    } else {
      Object.defineProperty(key, this.name, {
        value: [key, value],
        writable: true
      });
    }
    return value;
  };

  WeakMap.prototype.get = function(key) {
    var entry;
    entry = key[this.name];
    if (!((entry != null) && entry[0] === key)) {
      return;
    }
    return entry[1];
  };

  WeakMap.prototype["delete"] = function(key) {
    var entry;
    entry = key[this.name];
    if ((entry == null) || entry[0] !== key) {
      return false;
    }
    entry[0] = entry[1] = void 0;
    return true;
  };

  WeakMap.prototype.has = function(key) {
    var entry;
    entry = key[this.name];
    return (entry != null) && entry[0] === key;
  };

  _uniqueId = Date.now() % 1e9;

  _generateName = function() {
    return "__st" + (Math.random() * 1e9 >>> 0) + (_uniqueId++ + "__");
  };

}).call(this);

//# sourceMappingURL=map/WeakMap.js.map
