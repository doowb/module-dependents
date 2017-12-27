# module-dependents [![NPM version](https://img.shields.io/npm/v/module-dependents.svg?style=flat)](https://www.npmjs.com/package/module-dependents) [![NPM monthly downloads](https://img.shields.io/npm/dm/module-dependents.svg?style=flat)](https://npmjs.org/package/module-dependents)  [![NPM total downloads](https://img.shields.io/npm/dt/module-dependents.svg?style=flat)](https://npmjs.org/package/module-dependents) [![Linux Build Status](https://img.shields.io/travis/doowb/module-dependents.svg?style=flat&label=Travis)](https://travis-ci.org/doowb/module-dependents) [![Windows Build Status](https://img.shields.io/appveyor/ci/doowb/module-dependents.svg?style=flat&label=AppVeyor)](https://ci.appveyor.com/project/doowb/module-dependents)

> Get the list of npm modules that depend on any other npm module.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save module-dependents
```

Install with [yarn](https://yarnpkg.com):

```sh
$ yarn add module-dependents
```

## Usage

```js
var moduleDependents = require('module-dependents');
```

## API

### [moduleDependents](index.js#L31)

Get the list of npm modules that depend on any other npm module.

**Params**

* `name` **{String}**: Name of module to retrieve dependents for.
* `options` **{Object}**: Options to pass along to [npm-api-dependents](https://github.com/doowb/npm-api-dependents)
* `options.raw` **{Function}**: Optionally specify to get a raw object with a `name` property for each dependent.
* `returns` **{Stream}**: Returns an object stream with each object being an instance of `Repo` from the [npm-api](https://github.com/doowb/npm-api) module.

**Example**

```js
// returns a stream
moduleDependents('micromatch')
  .on('data', function(dependent) {
    console.log(dependent.name);
  });
```

## About

### Related projects

* [npm-api-dependents](https://www.npmjs.com/package/npm-api-dependents): npm-api plugin for getting module dependents. | [homepage](https://github.com/doowb/npm-api-dependents "npm-api plugin for getting module dependents.")
* [npm-api](https://www.npmjs.com/package/npm-api): Base class for retrieving data from the npm registry. | [homepage](https://github.com/doowb/npm-api "Base class for retrieving data from the npm registry.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Brian Woodward**

* [github/doowb](https://github.com/doowb)
* [twitter/doowb](https://twitter.com/doowb)

### License

Copyright © 2017, [Brian Woodward](https://github.com/doowb).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on December 27, 2017._