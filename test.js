'use strict';

require('mocha');
var assert = require('assert');
var moduleDependents = require('./');

describe('module-dependents', function() {
  this.timeout(10000);
  it('should export a function', function() {
    assert.equal(typeof moduleDependents, 'function');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      moduleDependents();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected "name" to be a string');
      cb();
    }
  });

  it('should return a promise', function(cb) {
    moduleDependents('module-dependents')
      .then(function(dependents) {
        try {
          assert(dependents);
          cb();
        } catch (err) {
          cb(err);
        }
      }, cb);
  });

  it('should return an array of dependent package.json objects', function(cb) {
    moduleDependents('module-dependents')
      .then(function(dependents) {
        try {
          assert(dependents);
          assert(Array.isArray(dependents));
          assert(dependents[0]);
          assert.equal(typeof dependents[0].name, 'string');
          assert.equal(typeof dependents[0].dependencies, 'object');
          cb();
        } catch (err) {
          cb(err);
        }
      }, cb);
  });

  it('should allow a custom `transform` function to transform the package.json objects', function(cb) {
    var names = [];
    moduleDependents('module-dependents', {
      transform: function(name, pkg, npm) {
        assert(name);
        assert(pkg);
        assert(npm);
        assert.equal(typeof name, 'string');
        assert.equal(typeof pkg, 'object');
        assert.equal(typeof npm, 'object');
        assert.equal(pkg.name, name);
        names.push({name: name});
        return {name: name};
      }
    })
    .then(function(dependents) {
      try {
        assert(dependents);
        assert(Array.isArray(dependents));
        assert.equal(typeof dependents[0].name, 'string');
        assert.equal(typeof dependents[0].dependencies, 'undefined');
        assert.deepEqual(dependents, names);
        cb();
      } catch (err) {
        cb(err);
      }
    }, cb);
  });

  it('should handle errors thrown in the `transform` function', function(cb) {
    var names = [];
    moduleDependents('module-dependents', {
      transform: function(name, pkg, npm) {
        throw new Error('transform error');
      }
    })
    .then(function(dependents) {
      try {
        assert(!dependents, 'expected an error');
        cb();
      } catch (err) {
        cb(err);
      }
    }, function(err) {
      try {
        assert(err);
        assert.equal(err.message, 'transform error');
        cb();
      } catch (err2) {
        cb(err2);
      }
    });
  });
});
