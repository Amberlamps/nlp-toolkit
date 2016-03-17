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
  var _freq = {};
  return through2.obj(function (chunk, enc, callback) {
    var _chunk = (typeof chunk === 'object' && Object.prototype.toString.call(chunk) !== '[object Array]') ? chunk.text : chunk;
    if (!_chunk || Object.prototype.toString.call(_chunk) !== '[object Array]') {
      return callback(new Error('Chunk is not an array ' + JSON.stringify(chunk)));
    }
    _chunk.forEach(function (token) {
      _freq = add(_freq, token, 1);
    });
    return callback();
  }, function (callback) {
    var _freqArray = Object.keys(_freq).map(function (item) {
      return {
        token: item,
        count: _freq[item]
      };
    });
    _freqArray.sort(function (a, b) {
      if (a.count > b.count) {
        return -1;
      } else {
        return 1
      }
    });
    this.push(_freqArray);
    return callback();
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