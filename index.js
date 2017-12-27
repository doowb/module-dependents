/*!
 * module-dependents <https://github.com/doowb/module-dependents>
 *
 * Copyright (c) 2016-2017, Brian Woodward.
 * Released under the MIT License.
 */

'use strict';

const NpmApi = require('npm-api');
const extend = require('extend-shallow');
const dependents = require('npm-api-dependents');

/**
 * Get the list of npm modules that depend on any other npm module.
 *
 * ```js
 * // returns a stream
 * moduleDependents('micromatch')
 *   .on('data', function(dependent) {
 *     console.log(dependent.name);
 *   });
 * ```
 * @param  {String} `name` Name of module to retrieve dependents for.
 * @param  {Object} `options` Options to pass along to [npm-api-dependents][]
 * @param  {Function} `options.raw` Optionally specify to get a raw object with a `name` property for each dependent.
 * @return {Stream} Returns an object stream with each object being an instance of `Repo` from the [npm-api][] module.
 * @api public
 */

module.exports = function moduleDependents(name, options) {
  if (typeof name !== 'string') {
    throw new TypeError('expected "name" to be a string');
  }

  const opts = extend({}, options);
  const npm = new NpmApi();
  npm.use(dependents());

  const repo = npm.repo(name);
  return repo.dependents(opts);
};
