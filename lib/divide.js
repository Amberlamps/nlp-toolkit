/**
 * Divide data into sets.
 */


'use strict';


/**
 * MODULES.
 */
var through2 = require('through2');
var debug = require('debug')('divide');


/**
 * FUNCTIONS.
 */
function divide(options) {

  options = options || {};
  var sets = options.sets || [1, 1];
  var slots = new Array(sets.reduce(function(pv, cv) { return pv + cv; }, 0));

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
    this.push(slots);
    return callback();
  });
}


/**
 * EXPORTS.
 */
module.exports = divide;