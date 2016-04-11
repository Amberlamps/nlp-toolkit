/**
 * Create idf.
 */


'use strict';


/**
 * MODULES.
 */
var through2 = require('through2');
var Idf = require('./components').Idf;


/**
 * FUNCTIONS.
 */
function idf(text, options) {

  if (!options && Object.prototype.toString.call(text) !== '[object Array]') {
    options = text;
    text = '';
  }

  options = options || {};

  if (text) {
    return Idf(text);
  }

  var _idf = Idf();

  return through2.obj(function (chunk, enc, callback) {

    var _chunk = (chunk.hasOwnProperty('text')) ? chunk.text : chunk;
    if (!_chunk || Object.prototype.toString.call(_chunk) !== '[object Array]' && !_chunk.hasOwnProperty('tokens')) {
      return callback(new Error('Cannot use document ' + JSON.stringify(chunk)));
    }

    _idf.add(_chunk);

    return callback();

  }, function (callback) {
    this.push(_idf);
    return callback();
  });

}


/**
 * EXPORTS.
 */
module.exports = idf;