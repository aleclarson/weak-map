
require "lotus-require"

NamedFunction = require "named-function"

WeakMap = module.exports = NamedFunction "WeakMap", ->
  
  return new WeakMap unless @ instanceof WeakMap
  
  @name = WeakMap.unique()
  
  @

WeakMap::set = (object, key, newValue) ->
  
  assertObject object
  
  entry = object[@name] ? []

  isDefined = entry[0] is object
  
  if arguments.hasOwnProperty 2

    data = entry[1]
    
    data = entry[1] = {} if !isDefined or !data?

    WeakMap.cake data, key, set: newValue
  
  else
 
    newValue = key

    entry[1] = newValue
  
  if !isDefined

    entry[0] = object
  
    Object.defineProperty object, @name, value: entry, writable: yes, configurable: yes
  
  newValue

WeakMap::get = (object, key) ->
  
  assertObject object
  
  entry = object[@name]
  
  return if !entry? or entry[0] isnt object
  
  data = entry[1]
  
  return data unless arguments.hasOwnProperty 1
  
  WeakMap.cake data, key, get: yes if data instanceof Object

WeakMap::remove = (object, key) ->

  assertObject object

  entry = object[@name]

  return no if !entry? or entry[0] isnt object

  if arguments.hasOwnProperty 1

    data = entry[1]

    return no unless data instanceof Object

    return WeakMap.cake data, key, remove: yes 

  entry[0] = entry[1] = undefined

  yes

WeakMap::has = (object, key) ->

  assertObject object

  entry = object[@name]

  return no if !entry? or entry[0] isnt object

  return yes unless arguments.hasOwnProperty 1

  data = entry[1]

  return no unless data instanceof Object

  WeakMap.cake data, key, has: yes

#
# Internal
#

call = (fn) -> fn()

assertObject = (value) ->
  unless value? and (!value.__proto__? or value instanceof Object)
    throw TypeError "'object' must inherit from Object"

Object.defineProperty WeakMap, "unique",

  writable: yes

  value: call ->

    uniqueIndex = Date.now() % 1e9

    -> "__st" + (Math.random() * 1e9 >>> 0) + (uniqueIndex++ + "__")

Object.defineProperty WeakMap, "cake",

  writable: yes

  value: call ->

    actions = ["get", "set", "has", "remove"]

    getAction = (actions, options) ->
      for action in actions
        return action if options.hasOwnProperty action
      throw Error "Missing action. Try: " + actions.join ", "

    (object, key, options) ->

      throw TypeError "'key' must be a String." unless typeof key is "string"

      throw TypeError "Cannot set '#{key}' on non-object." unless object instanceof Object

      action = getAction actions, options

      crumbs = key.split "."

      key = crumbs.pop()

      for crumb in crumbs

        trail = object[crumb]

        unless trail instanceof Object

          switch action

            when "get" then return

            when "set" then trail = object[crumb] = {}

            when "has" then return no

            when "remove" then return no

        object = trail

      switch action

        when "get" then object[key]

        when "set" then object[key] = options.set

        when "has" then object.hasOwnProperty key

        when "remove" then delete object[key]
