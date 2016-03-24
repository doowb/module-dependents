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
    var retries = {};
    var queue = new utils.Queue();

    var repos = yield npm.repo(name).dependents({mapFn: mapFn});
    repos.forEach(queue.push);

    var results = [];
    while (queue.buf.length) {
      var repo = yield queue.next();

      try {
        var obj = { name: repo.name };
        if (typeof opts.transform === 'function') {
          var pkg = yield repo.package();
          obj = opts.transform(repo.name, pkg);
        }
        results.push(obj);
      } catch (err) {
        if (retries[repo.name] && retries[repo.name] > 3) {
          console.error(repo.name, err);
        } else {
          retries[repo.name] = (retries[repo.name] || 0) + 1;
          queue.push(repo);
        }
      }

    }
    return results;
  });
};

function transform(name, pkg) {
  var result = {
    name: name,
    author: pkg.author,
    repository: pkg.repository,
    homepage: pkg.homepage,
    bugs: pkg.bugs
  };
  return result;
}

function mapFn(name) {
  return this.repo(name);
}
