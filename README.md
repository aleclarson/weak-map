
# weak-map v1.0.1 [![frozen](http://badges.github.io/stability-badges/dist/frozen.svg)](http://github.com/badges/stability-badges)

A CoffeeScript version of [this `WeakMap` shim](https://github.com/webcomponents/webcomponentsjs/blob/master/src/WeakMap/WeakMap.js) + some wonderful tweaks by yours truly.

```sh
npm install --save aleclarson/weak-map#1.0.1
```

&nbsp;

usage
-----

```CoffeeScript
WeakMap = require "weak-map"
map = WeakMap()
obj = {}
```

#### Get and set values

```CoffeeScript
map.set obj, "foo", true
map.get obj, "foo"
```

-

#### Get and set nested values

```CoffeeScript
map.set obj, "foo.bar.zen", true
map.get obj, "foo.bar.zen"
```

-

#### Get and set the whole storage object

```CoffeeScript
map.get obj
map.set obj, "any data type works fine"
```

-

#### Check if a value exists

```CoffeeScript
map.has obj
map.has obj, "foo"
map.has obj, "foo.bar"
```

-

#### Remove a value from existence

```CoffeeScript
map.remove obj
map.remove obj, "foo"
map.remove obj, "foo.bar"
```

&nbsp;

changelog
---------

#### 1.0.1

&nbsp;&nbsp;
**\+**
Support key arguments for all methods!

&nbsp;&nbsp;
**\+**
Support keys with dot-syntax (eg: "foo.bar")!

#### 1.0.0

&nbsp;&nbsp;
**\+**
Works in both the browser and Node!

&nbsp;&nbsp;
**\+**
`module.exports` now equals `WeakMap`.

&nbsp;&nbsp;
**\+**
`window.WeakMap` no longer equals `WeakMap` (if `window.WeakMap` doesn't already exist).

&nbsp;&nbsp;
**\+**
The `new` keyword is no longer needed when constructing a `WeakMap`.

&nbsp;&nbsp;
**\+**
`WeakMap::set` now returns the passed value (rather than the `WeakMap` instance).

&nbsp;&nbsp;
**\+**
`WeakMap.name` now equals `"WeakMap"`.

&nbsp;

tests
-----

All tests are passing! Find out for yourself:

```sh
npm install -g jasmine-node
npm test
```

&nbsp;
