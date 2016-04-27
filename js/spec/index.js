var WeakMap;

WeakMap = require("../..");

describe("WeakMap::set(Object, Any)", function() {
  return it("returns the newly associated data", function() {
    return expect(WeakMap().set({}, 42)).toBe(42);
  });
});

describe("WeakMap::set(Object, String, Any)", function() {
  it("returns the newly associated data", function() {
    return expect(WeakMap().set({}, "foo", 42)).toBe(42);
  });
  it("creates objects for keys that don't yet exist", function() {
    var map, obj, value;
    map = WeakMap();
    obj = {};
    map.set(obj, "foo", true);
    value = map.get(obj);
    expect(value != null).toBe(true);
    if (value != null) {
      return expect(value.constructor).toBe(Object);
    }
  });
  return describe("when String has dot-syntax (eg: \"foo.bar\")", function() {
    it("returns the newly associated data", function() {
      return expect(WeakMap().set({}, "foo.bar", 42)).toBe(42);
    });
    return it("creates objects for nested keys that don't yet exist", function() {
      var map, obj, value;
      map = WeakMap();
      obj = {};
      map.set(obj, "foo.bar", true);
      value = map.get(obj, "foo");
      expect(value != null).toBe(true);
      if (value != null) {
        return expect(value.constructor).toBe(Object);
      }
    });
  });
});

describe("WeakMap::get(Object)", function() {
  it("returns undefined if the given object has no associated data", function() {
    return expect(WeakMap().get({})).toBe(void 0);
  });
  return it("returns the associated data for the given object", function() {
    var map, obj;
    map = WeakMap();
    obj = {};
    map.set(obj, 42);
    return expect(map.get(obj)).toBe(42);
  });
});

describe("WeakMap::get(Object, String)", function() {
  it("returns undefined if the key doesn't have an associated value", function() {
    return expect(WeakMap().get({}, "foo")).toBe(void 0);
  });
  return describe("when String has dot-syntax (eg: \"foo.bar\")", function() {
    return it("returns undefined if the key doesn't have an associated value", function() {
      return expect(WeakMap().get({}, "foo.bar")).toBe(void 0);
    });
  });
});

//# sourceMappingURL=../../map/spec/index.map
