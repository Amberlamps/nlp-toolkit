/**
 * Create frequency distribution.
 */


'use strict';


/**
 * MODULES.
 */
var through2 = require('through2');
var FreqDist = require('./components').FreqDist;


/**
 * FUNCTIONS.
 */
function frequency(text, options) {

  if (!options && Object.prototype.toString.call(text) !== '[object Array]') {
    options = text;
    text = '';
  }

  options = options || {};

  if (text) {
    return FreqDist(text);
  }

  var _freq = FreqDist();

  return through2.obj(function (chunk, enc, callback) {

    var _chunk = (typeof chunk === 'object' && Object.prototype.toString.call(chunk) !== '[object Array]') ? chunk.text : chunk;
    if (!_chunk || Object.prototype.toString.call(_chunk) !== '[object Array]') {
      return callback(new Error('Chunk is not an array ' + JSON.stringify(chunk)));
    }
    if (options.cache) {
      _freq.add(_chunk);
      return callback();
    }
    return callback(null, FreqDist(_chunk));
  }, function (callback) {
    if (options.cache) {
      this.push(_freq);
    }
    return callback();
  });

}


/**
 * EXPORTS.
 */
module.exports = frequency;