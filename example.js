'use strict';

var co = require('co');
var pad = require('right-pad-keys');

var dependents = require('./');

co(function* () {
  var repos = yield dependents('lazy-cache');
  var results = {};

  repos.forEach(function(repo) {
    results[repo.name] = repo.repository ? repo.repository.url : '<undefined>';
  });
  results = pad(results);
  Object.keys(results).forEach(function(key) {
    console.log(key, results[key]);
  });
}).then(function() {
  console.log('done');
}, function(err) {
  console.error(err);
});
