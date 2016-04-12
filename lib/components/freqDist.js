/**
 * Create an freqDist object.
 */


'use strict';


function FreqDist(_text) {

  var _cache = {};
  var _ordered;
  var _size;
  var _count;
  var _tokens;

  if (_text) {
    add(_text);
  }

  function add(_text, _count) {
    _reset();

    if (_text.hasOwnProperty('merge') && typeof _text['merge'] === 'function') {
      _cache = _text.merge(_cache);
      return this;
    }

    _text = [].concat(_text);
    if (typeof _count === 'undefined') {
      _count = 1;
    }
    _text.forEach(function addToken(_token) {
      if (!_cache.hasOwnProperty(_token)) {
        _cache[_token] = 0;
      }
      _cache[_token] += _count;
    });
    return this;
  }

  function merge(external) {
    for (var key in _cache) {
      if (!external.hasOwnProperty(key)) {
        external[key] = 0;
      }
      external[key] += _cache[key];
    }
    return external;
  }

  function count(token) {
    if (token) {
      return (_cache.hasOwnProperty(token)) ? _cache[token] : 0;
    }
    return (typeof _count !== 'undefined') ? _count : _count = Object.keys(_cache).reduce(function (p, c) {
      return p + _cache[c];
    }, 0);
  }

  function range(start, end) {
    start = (typeof start !== 'undefined') ? start : 0;
    end = (typeof end !== 'undefined') ? end : size();
    if (typeof _ordered === 'undefined') {
      var __count = count();
      _ordered = tokens().map(function (token) {
        return {
          name: token,
          count: _cache[token],
          tf: _cache[token] / __count
        };
      });
      _ordered.sort(function (a, b) {
        return a.count > b.count ? 1 : -1;
      });
    }
    return _ordered.slice(start, end);
  }

  function size() {
    return (typeof _size !== 'undefined') ? _size : _size = Object.keys(_cache).length;
  }

  function tokens() {
    return (typeof _tokens !== 'undefined') ? _tokens : _tokens = Object.keys(_cache);
  }

  function _reset() {
    _count = undefined;
    _ordered = undefined;
    _size = undefined;
    _tokens = undefined;
  }

  return {
    add: add,
    count: count,
    merge: merge,
    range: range,
    size: size,
    tokens: tokens
  };

}

module.exports = FreqDist;