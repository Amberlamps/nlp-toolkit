/**
 * Prepare data.
 */


'use strict';


/**
 * MODULES.
 */
var through2 = require('through2');


/**
 * FUNCTIONS.
 */
function prepare(fn) {
  fn = (typeof fn === 'function') ? fn : function (chunk) { return chunk; };
  return through2.obj(function (chunk, enc, callback) {
    return callback(null, fn(chunk));
  });
}


/**
 * EXPORTS.
 */
module.exports = prepare;