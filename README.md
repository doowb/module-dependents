# module-dependents [![NPM version](https://img.shields.io/npm/v/module-dependents.svg)](https://www.npmjs.com/package/module-dependents) [![Build Status](https://img.shields.io/travis/doowb/module-dependents.svg)](https://travis-ci.org/doowb/module-dependents)

> Retrieve list of dependents for an npm module.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install module-dependents --save
```

## Usage

```js
var moduleDependents = require('module-dependents');
```

## API

### [moduleDependents](index.js#L37)

Retrieve a list of dependent modules given a module name.

**Params**

* `name` **{String}**: Name of module to retrieve dependents for.
* `options` **{Object}**: Options to control what data is retrieved.
* `options.transform` **{Function}**: Optional transform function that takes module name and package.json object.
* `returns` **{Promise}**: Returns array of objects with module information when promise is resolved.

**Example**

```js
// returns a Promise
moduleDependents('micromatch')
  .then(function(dependents) {
    console.log(dependents);
  }, function(err) {
    console.error(err);
  });

// using co and a generator function
co(function* () {
  var dependents = yield moduleDependents();
  console.log(dependents);
});
```

## Related projects

* [npm-api](https://www.npmjs.com/package/npm-api): Base class for retrieving data from the npm registry. | [homepage](https://github.com/doowb/npm-api)
* [npm-api-dependents](https://www.npmjs.com/package/npm-api-dependents): npm-api plugin for getting module dependents. | [homepage](https://github.com/doowb/npm-api-dependents)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/doowb/module-dependents/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](http://twitter.com/doowb)

## License

Copyright © 2016 [Brian Woodward](https://github.com/doowb)
Released under the [MIT license](https://github.com/doowb/module-dependents/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on March 23, 2016._