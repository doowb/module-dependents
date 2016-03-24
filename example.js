'use strict';

var co = require('co');
var pad = require('right-pad-keys');

var dependents = require('./');

co(function* () {
  var repos = yield dependents('object.pick');
  var results = {};

  repos.forEach(function(repo) {
    results[repo.name] = repo.repository ? repo.repository.url : '<undefined>';
  });
  results = pad(results);
  Object.keys(results).forEach(function(key) {
    console.log(key, results[key]);
  });
});
