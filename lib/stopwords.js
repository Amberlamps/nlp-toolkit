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
var stopwordsCache = {};


/**
 * FUNCTIONS.
 */
function stopwords(text, options) {

  if (!options && Object.prototype.toString.call(text) !== '[object Array]') {
    options = text;
    text = '';
  }

  options = options || {};
  options.defaultLang = options.defaultLang || DEFAULT_LANG;
  options.defaultFilename = options.defaultFilename || getFilename(options.defaultLang);
  options.additionalWords = options.additionalWords || {};

  if (Object.prototype.toString.call(options.additionalWords) === '[object Array]') {
    options.additionalWords = {
      all: options.additionalWords
    };
  } else {
    options.additionalWords.all = (options.additionalWords.all) ? [].concat(options.additionalWords.all) : [];
    options.additionalWords.default = (options.additionalWords.default) ? [].concat(options.additionalWords.default) : [];
  }

  var getLang = function () {
    return 'default';
  };

  if (options.lang) {
    if (typeof options.lang === 'function') {
      getLang = options.lang;
    } else {
      getLang = function () {
        return options.lang;
      };
    }
  }

  stopwordsCache.default = getStopwordsWrapper(options.defaultFilename, options.additionalWords, 'default');

  if (text) {
    return removeStopwords(text, options.lang || options.defaultLang);
  }

  debug('defaultLang', options.defaultLang);
  debug('defaultFilename', options.defaultFilename);

  function removeStopwords(text, lang) {
    if (!stopwordsCache.hasOwnProperty(lang)) {
      stopwordsCache[lang] = getStopwordsWrapper(getFilename(lang), options.additionalWords, lang);
    }
    return stopwordsCache[lang]()
    .then(function (stopwordsCache) {
      var tokens = text.filter(function (token) {
        return !stopwordsCache.hasOwnProperty(token);
      });
      return tokens;
    });
  }

  return through2.obj(function (chunk, enc, callback) {

    var _chunk = (typeof chunk === 'object' && Object.prototype.toString.call(chunk) !== '[object Array]') ? chunk.text : chunk;
    if (!_chunk || Object.prototype.toString.call(_chunk) !== '[object Array]') {
      return callback(new Error('Chunk is not an array ' + JSON.stringify(chunk)));
    }

    removeStopwords(_chunk, getLang(chunk))
    .then(function (tokens) {
      var response;
      if (Object.prototype.toString.call(chunk) !== '[object Array]') {
        chunk.text = tokens;
        response = chunk;
      } else {
        response = tokens;
      }
      return callback(null, response);
    })
    .catch(callback);

  });

}

function getStopwordsWrapper(filename, additionalWords, lang) {
  var singleStopwordsCache;
  var _words = [].concat(additionalWords.all);
  _words = _words.concat(additionalWords[lang] || additionalWords.default);
  return function getStopwords() {
    return new Promise(function (resolve, reject) {
      if (singleStopwordsCache) {
        return resolve(singleStopwordsCache);
      }
      var _stopwordsCache = {};
      fs.createReadStream(filename, 'utf8')
      .pipe(es.split())
      .on('data', function (word) {
        _stopwordsCache[word] = 1;
      })
      .on('end', function () {
        singleStopwordsCache = _stopwordsCache;
        _words.forEach(function (_word) {
          singleStopwordsCache[_word] = 1;
        })
        return resolve(singleStopwordsCache);
      })
      .on('error', function (err) {
        return reject(err);
      });
    });
  };
}

function getFilename(lang) {
  return path.resolve(__dirname, './stopwords/' + lang + '.txt');
}

/**
 * EXPORTS.
 */
module.exports = stopwords;