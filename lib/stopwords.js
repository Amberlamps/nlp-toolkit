/**
 * Eliminate stopwords.
 */


'use strict';


/**
 * MODULES.
 */
var through2 = require('through2');
var fs = require('fs');
var es = require('event-stream');
var path = require('path');


/**
 * VARIABLES.
 */
var DEFAULT_LANG = 'en';


/**
 * FUNCTIONS.
 */
function stopwords(options) {
  options = options || {};
  var lang = options.lang || DEFAULT_LANG;
  var filename = options.filename || path.resolve(__dirname, './stopwords/' + lang + '.txt');
  var stopwordsCache = {};
  return through2.obj(function (chunk, enc, callback) {
    fs.createReadStream(filename, 'utf8')
    .pipe(es.split())
    .on('data', function (word) {
      stopwordsCache[word] = 1;
    })
    .on('end', function () {
      return callback(null, chunk.filter(function (token) {
        return !stopwordsCache.hasOwnProperty(token);
      }));
    })
    .on('error', function (err) {
      throw err;
    });
  });
}


/**
 * EXPORTS.
 */
module.exports = stopwords;