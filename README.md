# weak-map v1.0.0 [![frozen](http://badges.github.io/stability-badges/dist/frozen.svg)](http://github.com/badges/stability-badges)

A CoffeeScript version of [this `WeakMap` shim](https://github.com/webcomponents/webcomponentsjs/blob/master/src/WeakMap/WeakMap.js) + some wonderful tweaks by yours truly.

```sh
npm install --save aleclarson/weak-map#1.0.0
```

&nbsp;

usage
-----

```CoffeeScript
WeakMap = require "weak-map"

obj = {}

map = WeakMap()

map.set obj, "hello world"   # "hello world"

map.has obj                  # true

map.get obj                  # "hello world"

map.delete obj               # true
```

&nbsp;

changelog
---------

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
