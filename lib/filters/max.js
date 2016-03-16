/**
 * Max number of tokens.
 */


'use strict';


/**
 * MODULES.
 */
var through2 = require('through2');


/**
 * VARIABLES.
 */
var DEFAULT_MAX = Infinity;


/**
 * FUNCTIONS.
 */
function max(value) {
  value = value || DEFAULT_MAX;
  return through2.obj(function (chunk, enc, callback) {
    var _chunk = (typeof chunk === 'object' && Object.prototype.toString.call(chunk) !== '[object Array]') ? chunk.text : chunk;
    if (!_chunk || Object.prototype.toString.call(_chunk) !== '[object Array]') {
      return callback(new Error('Chunk is not an array ' + JSON.stringify(chunk)));
    }
    if (_chunk.length > value) {
      return callback();
    }
    return callback(null, chunk);
  });
}


/**
 * EXPORTS.
 */
module.exports = max;