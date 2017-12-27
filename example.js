'use strict';

const through = require('through2');
const pad = require('right-pad-keys');

const dependents = require('./');

let results = {};
const tasks = [];
const transform = through.obj(function(dependent, enc, next) {
  // queue up tasks to retrieve package.json files later
  const task = () => {
    return dependent.package()
      .then((pkg) => {
        process.stdout.write('.');
        results[pkg.name] = pkg.repository ? pkg.repository.url : '<undefined>';
      });
  };
  tasks.push(task);

  next(null, dependent);
}, function(cb) {

  // get all of the package.json files at once
  Promise.all(tasks.map((task) => task()))
    .then(() => {
      process.stdout.write('\n');
      results = pad(results);
      Object.keys(results).forEach(function(key) {
        console.log(key, results[key]);
      });
    })
    .then(cb)
    .catch(cb);
});

dependents('micromatch')
  .pipe(transform)
  .on('data', () => {})
  .on('error', console.error)
  .on('end', function() {
    console.log('done');
  });
