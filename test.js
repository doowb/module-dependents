'use strict';

require('mocha');
const assert = require('assert');
const isPlainObject = require('is-plain-object');

const moduleDependents = require('./');

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

  it('should return a stream', function(cb) {
    let count = 0;
    moduleDependents('module-dependents')
      .on('data', function(dependent) {
        assert(dependent);
        count++;
      })
      .once('error', cb)
      .once('end', function() {
        assert(count > 0, 'Expected count to be greater than 0.');
        cb();
      });
  });

  it('should allow passing `options.raw` through to npm-api-dependents', function(cb) {
    let count = 0;
    moduleDependents('module-dependents', {raw: true})
      .on('data', function(dependent) {
        assert(isPlainObject(dependent));
        count++;
      })
      .once('error', cb)
      .once('end', function() {
        assert(count > 0, 'Expected count to be greater than 0.');
        cb();
      });
  });
});
