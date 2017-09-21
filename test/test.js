var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
var mfun = require('../my_mod.js');
describe('mfun', function() {
  it('returns the first element of an array', function() {
    var result = mfun([1, 2, 3]);

    assert.equal(result, 1, 'mfun([1, 2, 3]) is 1');
  });
});
