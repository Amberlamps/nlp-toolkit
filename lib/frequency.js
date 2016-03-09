/**
 * Create frequency distribution.
 */


'use strict';


/**
 * MODULES.
 */
var through2 = require('through2');


/**
 * FUNCTIONS.
 */
function frequency() {
  return through2.obj(function (chunk, enc, callback) {
    var _freq = {};
    chunk.forEach(function (token) {
      if (typeof token === 'object') {
        for (var key in token) {
          _freq = add(_freq, key, token[key]);
        }
      } else {
        _freq = add(_freq, token, 1);
      }
    });
    return callback(null, _freq);
  });

}

function add(_freq, token, count) {
  if (!_freq.hasOwnProperty(token)) {
    _freq[token] = 0;
  }
  _freq[token] += count;
  return _freq;
}


/**
 * EXPORTS.
 */
module.exports = frequency;