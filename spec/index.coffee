
WeakMap = require "../.."

describe "WeakMap::set(Object, Any)", ->

  it "returns the newly associated data", ->
    expect(WeakMap().set {}, 42).toBe 42

describe "WeakMap::set(Object, String, Any)", ->

  it "returns the newly associated data", ->
    expect(WeakMap().set {}, "foo", 42).toBe 42

  it "creates objects for keys that don't yet exist", ->
    map = WeakMap()
    obj = {}
    map.set obj, "foo", yes
    value = map.get obj
    expect(value?).toBe yes
    if value? then expect(value.constructor).toBe Object

  describe "when String has dot-syntax (eg: \"foo.bar\")", ->

    it "returns the newly associated data", ->
      expect(WeakMap().set {}, "foo.bar", 42).toBe 42

    it "creates objects for nested keys that don't yet exist", ->
      map = WeakMap()
      obj = {}
      map.set obj, "foo.bar", yes
      value = map.get obj, "foo"
      expect(value?).toBe yes
      if value? then expect(value.constructor).toBe Object

describe "WeakMap::get(Object)", ->

  it "returns undefined if the given object has no associated data", ->
    expect(WeakMap().get {}).toBe undefined

  it "returns the associated data for the given object", ->
    map = WeakMap()
    obj = {}
    map.set obj, 42
    expect(map.get obj).toBe 42

describe "WeakMap::get(Object, String)", ->

  it "returns undefined if the key doesn't have an associated value", ->
    expect(WeakMap().get {}, "foo").toBe undefined

  describe "when String has dot-syntax (eg: \"foo.bar\")", ->

    it "returns undefined if the key doesn't have an associated value", ->
      expect(WeakMap().get {}, "foo.bar").toBe undefined
