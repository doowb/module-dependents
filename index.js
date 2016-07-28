/*!
 * module-dependents <https://github.com/doowb/module-dependents>
 *
 * Copyright (c) 2016, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

/**
 * Retrieve a list of dependent modules given a module name.
 *
 * ```js
 * // returns a Promise
 * moduleDependents('micromatch')
 *   .then(function(dependents) {
 *     console.log(dependents);
 *   }, function(err) {
 *     console.error(err);
 *   });
 *
 * // using co and a generator function
 * co(function* () {
 *   var dependents = yield moduleDependents();
 *   console.log(dependents);
 * });
 * ```
 * @param  {String} `name` Name of module to retrieve dependents for.
 * @param  {Object} `options` Options to control what data is retrieved.
 * @param  {Function} `options.transform` Optional transform function that takes module name and package.json object.
 * @return {Promise} Returns array of objects with module information when promise is resolved.
 * @api public
 */

module.exports = function moduleDependents(name, options) {
  var opts = utils.extend({transform: transform}, options);
  var npm = utils.npm();
  npm.use(utils.dependents());

  return utils.co(function* () {
    var repos = yield npm.repo(name).dependents({mapFn: mapFn});
    var results = yield repos.map(function(repo) {
      return repo.package();
    });

    if (typeof opts.transform === 'function') {
      return yield results.map(function(pkg) {
        return opts.transform(pkg.name, pkg, npm);
      });
    }
    return results;
  });
};

function transform(name, pkg) {
  return pkg;
}

function mapFn(name) {
  return this.repo(name);
}
