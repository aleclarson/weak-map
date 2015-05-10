
# This is a CoffeeScript rewrite of: 
# https://github.com/webcomponents/webcomponentsjs/blob/master/src/WeakMap/WeakMap.js

require "lotus-require"

NamedFunction = require "named-function"

WeakMap = module.exports = NamedFunction "WeakMap", ->
  return new WeakMap unless this instanceof WeakMap
  @name = _generateName()
  return this

WeakMap::set = (key, value) ->
  entry = key[@name]
  if entry? and entry[0] is key
    entry[1] = value
  else
    Object.defineProperty key, @name, { value: [key, value], writable: true }
  return value

WeakMap::get = (key) ->
  entry = key[@name]
  return unless entry? and entry[0] is key
  return entry[1]

WeakMap::delete = (key) ->
  entry = key[@name]
  return false if !entry? or entry[0] isnt key
  entry[0] = entry[1] = undefined
  return true

WeakMap::has = (key) ->
  entry = key[@name]
  return entry? and entry[0] is key

#
# Internal
#

_uniqueId = Date.now() % 1e9

_generateName = ->
  "__st" + (Math.random() * 1e9 >>> 0) + (_uniqueId++ + "__")
