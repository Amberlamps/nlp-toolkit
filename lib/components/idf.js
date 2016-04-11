/**
 * Create an Idf object.
 */


'use strict';


var FreqDist = require('./').FreqDist;


function Idf(freqDists) {

  var _cache = {};
  var _ordered;
  var _size;
  var _tokens;
  var documents = 0;

  if (freqDists) {
    add(freqDists);
  }

  function add(freqDists) {
    _reset();
    freqDists = [].concat(freqDists);
    freqDists.forEach(function (freqDist) {
      documents += 1;
      var _freqDist = (freqDist.hasOwnProperty('tokens') && typeof freqDist.tokens === 'function') ? freqDist : FreqDist(freqDist);
      _freqDist.tokens().forEach(function (token) {
        if (!_cache.hasOwnProperty(token)) {
          _cache[token] = 0;
        }
        _cache[token] += 1;
      });
    });
    return this;
  }

  function get(token) {
    if (!_cache.hasOwnProperty(token)) {
      return 0;
    }
    return Math.log(documents / _cache[token]);
  }

  function range(start, end) {
    start = (typeof start !== 'undefined') ? start : 0;
    end = (typeof end !== 'undefined') ? end : size() - 1;
    if (typeof _ordered === 'undefined') {
      _ordered = tokens().map(function (token) {
        return {
          name: token,
          count: _cache[token],
          idf: get(token)
        };
      });
      _ordered.sort(function (a, b) {
        return a.count > b.count ? 1 : -1;
      });
    }
    return _ordered.slice(start, end);
  }

  function size() {
    return (typeof _size !== 'undefined') ? _size : _size = tokens().length;
  }

  function tokens() {
    return (typeof _tokens !== 'undefined') ? _tokens : _tokens = Object.keys(_cache);
  }

  function _reset() {
    _size = undefined;
    _tokens = undefined;
  }

  return {
    add: add,
    get: get,
    range: range,
    size: size,
    tokens: tokens
  };

}

module.exports = Idf;