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
var Promise = require('bluebird');
var debug = require('debug')('stopwords');


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
  var getStopwords = getStopwordsWrapper(filename);

  debug('lang', lang);
  debug('filename', filename);

  return through2.obj(function (chunk, enc, callback) {
    getStopwords()
    .then(function (stopwordsCache) {
      var _chunk = (typeof chunk === 'object' && Object.prototype.toString.call(chunk) !== '[object Array]') ? chunk.text : chunk;
      if (!_chunk || Object.prototype.toString.call(_chunk) !== '[object Array]') {
        return callback(new Error('Chunk is not an array ' + JSON.stringify(chunk)));
      }
      var tokens = _chunk.filter(function (token) {
        return !stopwordsCache.hasOwnProperty(token);
      });
      var response;
      if (typeof chunk === 'object') {
        chunk.text = tokens;
        response = chunk;
      } else {
        response = tokens;
      }
      return callback(null, response);
    })
    .catch(function (err) {
      return callback(err);
    });
  });
}

function getStopwordsWrapper(filename) {
  var stopwordsCache;
  return function getStopwords() {
    return new Promise(function (resolve, reject) {
      if (stopwordsCache) {
        return resolve(stopwordsCache);
      }
      var _stopwordsCache = {};
      fs.createReadStream(filename, 'utf8')
      .pipe(es.split())
      .on('data', function (word) {
        _stopwordsCache[word] = 1;
      })
      .on('end', function () {
        stopwordsCache = _stopwordsCache;
        return resolve(stopwordsCache);
      })
      .on('error', function (err) {
        return reject(err);
      });
    });
  };
}

/**
 * EXPORTS.
 */
module.exports = stopwords;