/**
 * Test components.
 */


'use strict';


var nlp = require('../index.js');
var assert = require('assert');


describe('nlp.components', function () {
  describe('FreqDist', function () {
    var text = nlp.tokenizer('this is a house. and this is a tree.');
    var freqDist = nlp.components.FreqDist();
    freqDist.add(text);
    describe('#count()', function () {
      it('should return 9', function () {
        assert.equal(freqDist.count(), 9);
      });
    });
    describe('#count(house)', function () {
      it('should return 1', function () {
        assert.equal(freqDist.count('house'), 1);
      });
    });
    describe('#range()', function () {
      it('length should equal #size()', function () {
        assert.equal(freqDist.range().length, freqDist.size());
      });
    });
    describe('#range(0, 1)', function () {
      it('should return 1 element', function () {
        assert.equal(freqDist.range(0, 1).length, 1);
      });
      it('should return first element', function () {
        assert.deepEqual(freqDist.range(0, 1)[0], freqDist.range()[0]);
      });
    });
    describe('#range(2, 4)', function () {
      it('should return 2 elements', function () {
        assert.equal(freqDist.range(2, 4).length, 2);
      });
    });
    describe('#range(3)', function () {
      it('should return #size()-3 elements', function () {
        assert.equal(freqDist.range(3).length, freqDist.size()-3);
      });
    });
    describe('#range(-2)', function () {
      it('should return 2 elements', function () {
        assert.equal(freqDist.range(-2).length, 2);
      });
      it('should return last 2 elements', function () {
        assert.deepEqual(freqDist.range(-2)[0], freqDist.range()[freqDist.range().length-2]);
        assert.deepEqual(freqDist.range(-2)[1], freqDist.range()[freqDist.range().length-1]);
      });
    });
    describe('#range(-2, -1)', function () {
      it('should return 1 element', function () {
        assert.equal(freqDist.range(-1).length, 1);
      });
    });
    describe('#size()', function () {
      it('should return 6', function () {
        assert.equal(freqDist.size(), 6);
      });
    });
  });
});