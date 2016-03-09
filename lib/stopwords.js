/**
 * Eliminate stopwords.
 */


'use strict';


/**
 * MODULES.
 */
var through2 = require('through2');
var fs = require('fs');


/**
 * VARIABLES.
 */
var stopwordsCache = {};


/**
 * FUNCTIONS.
 */
function stopwords(options) {
  options = options || {};
  var filename = options.filename;
  return through2({ objectMode: true }, function (chunk, enc, callback) {
    if (!stopwordsCache.hasOwnProperty(filename)) {
      var _file = fs.readFileSync(filename, 'utf8');
      stopwordsCache[filename] = _file.split('\n').reduce(function (p, c) {
        p[c.trim()] = 1;
        return p;
      }, {});
    }
    return callback(null, chunk.filter(function (token) {
      return !stopwordsCache[filename].hasOwnProperty(token);
    }));
  });
}


/**
 * EXPORTS.
 */
module.exports = stopwords;