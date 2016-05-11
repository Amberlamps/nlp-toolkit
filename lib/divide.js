/**
 * Divide data into sets.
 */


'use strict';


/**
 * MODULES.
 */
var through2 = require('through2');
var debug = require('debug')('divide');
var _ = require('lodash');


/**
 * FUNCTIONS.
 */
function divide(options) {

  options = options || {};
  var sets = options.sets || [1, 1];
  var maxItems = +options.maxItems;
  var numSlots = sets.reduce(function(pv, cv) { return pv + cv; }, 0);
  var slots = new Array(numSlots);

  debug('sets', sets);

  var done = options.done || function() {};
  return through2.obj(function (chunk, enc, callback) {
    var position = Math.floor(Math.random() * slots.length);
    if (!slots[position]) {
      slots[position] = [];
    }
    var slot = slots[position];
    slot[slot.length] = chunk;
    return callback();
  }, function (callback) {
    if (maxItems) {
      maxItems = maxItems / numSlots;
      slots = slots.map(function (slot) {
        var _slot = _.shuffle(slot);
        var _featureCounter = {};
        return _slot.filter(function (item) {
          if (!_featureCounter.hasOwnProperty(item.feature)) {
            _featureCounter[item.feature] = 0;
          }
          _featureCounter[item.feature] += 1;
          return (_featureCounter[item.feature] <= maxItems);
        });
      });
    }
    this.push(slots);
    return callback();
  });
}


/**
 * EXPORTS.
 */
module.exports = divide;