(function() {
  var NamedFunction, WeakMap, assertObject, call;

  require("lotus-require");

  NamedFunction = require("named-function");

  WeakMap = module.exports = NamedFunction("WeakMap", function() {
    if (!(this instanceof WeakMap)) {
      return new WeakMap;
    }
    this.name = WeakMap.unique();
    return this;
  });

  WeakMap.prototype.set = function(object, key, newValue) {
    var data, entry, isDefined, ref;
    assertObject(object);
    entry = (ref = object[this.name]) != null ? ref : [];
    isDefined = entry[0] === object;
    if (arguments.hasOwnProperty(2)) {
      data = entry[1];
      if (!isDefined || (data == null)) {
        data = entry[1] = {};
      }
      WeakMap.cake(data, key, {
        set: newValue
      });
    } else {
      newValue = key;
      entry[1] = newValue;
    }
    if (!isDefined) {
      entry[0] = object;
      Object.defineProperty(object, this.name, {
        value: entry,
        writable: true,
        configurable: true
      });
    }
    return newValue;
  };

  WeakMap.prototype.get = function(object, key) {
    var data, entry;
    assertObject(object);
    entry = object[this.name];
    if ((entry == null) || entry[0] !== object) {
      return;
    }
    data = entry[1];
    if (!arguments.hasOwnProperty(1)) {
      return data;
    }
    if (data instanceof Object) {
      return WeakMap.cake(data, key, {
        get: true
      });
    }
  };

  WeakMap.prototype.remove = function(object, key) {
    var data, entry;
    assertObject(object);
    entry = object[this.name];
    if ((entry == null) || entry[0] !== object) {
      return false;
    }
    if (arguments.hasOwnProperty(1)) {
      data = entry[1];
      if (!(data instanceof Object)) {
        return false;
      }
      return WeakMap.cake(data, key, {
        remove: true
      });
    }
    entry[0] = entry[1] = void 0;
    return true;
  };

  WeakMap.prototype.has = function(object, key) {
    var data, entry;
    assertObject(object);
    entry = object[this.name];
    if ((entry == null) || entry[0] !== object) {
      return false;
    }
    if (!arguments.hasOwnProperty(1)) {
      return true;
    }
    data = entry[1];
    if (!(data instanceof Object)) {
      return false;
    }
    return WeakMap.cake(data, key, {
      has: true
    });
  };

  call = function(fn) {
    return fn();
  };

  assertObject = function(value) {
    if (!((value != null) && ((value.__proto__ == null) || value instanceof Object))) {
      throw TypeError("'object' must inherit from Object");
    }
  };

  Object.defineProperty(WeakMap, "unique", {
    writable: true,
    value: call(function() {
      var uniqueIndex;
      uniqueIndex = Date.now() % 1e9;
      return function() {
        return "__st" + (Math.random() * 1e9 >>> 0) + (uniqueIndex++ + "__");
      };
    })
  });

  Object.defineProperty(WeakMap, "cake", {
    writable: true,
    value: call(function() {
      var actions, getAction;
      actions = ["get", "set", "has", "remove"];
      getAction = function(actions, options) {
        var action, i, len;
        for (i = 0, len = actions.length; i < len; i++) {
          action = actions[i];
          if (options.hasOwnProperty(action)) {
            return action;
          }
        }
        throw Error("Missing action. Try: " + actions.join(", "));
      };
      return function(object, key, options) {
        var action, crumb, crumbs, i, len, trail;
        if (typeof key !== "string") {
          throw TypeError("'key' must be a String.");
        }
        if (!(object instanceof Object)) {
          throw TypeError("Cannot set '" + key + "' on non-object.");
        }
        action = getAction(actions, options);
        crumbs = key.split(".");
        key = crumbs.pop();
        for (i = 0, len = crumbs.length; i < len; i++) {
          crumb = crumbs[i];
          trail = object[crumb];
          if (!(trail instanceof Object)) {
            switch (action) {
              case "get":
                return;
              case "set":
                trail = object[crumb] = {};
                break;
              case "has":
                return false;
              case "remove":
                return false;
            }
          }
          object = trail;
        }
        switch (action) {
          case "get":
            return object[key];
          case "set":
            return object[key] = options.set;
          case "has":
            return object.hasOwnProperty(key);
          case "remove":
            return delete object[key];
        }
      };
    })
  });

}).call(this);

//# sourceMappingURL=map/index.js.map
