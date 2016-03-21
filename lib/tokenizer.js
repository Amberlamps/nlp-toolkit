/**
 * Tokenize text.
 */


'use strict';


/**
 * MODULES.
 */
var through2 = require('through2');
var debug = require('debug')('tokenizer');


/**
 * VARIABLES.
 */
var DEFAULT_CHARACTERS = /[^\w]/g;
var DEFAULT_SEPARATOR = /\s/g;
var DEFAULT_ELIMINATE_NUMBERS = false;
var DEFAULT_TOLOWERCASE = true;
var DEFAULT_EMPTY_STRINGS = false;


/**
 * FUNCTIONS.
 */
function tokenizer(text, options) {

  if (!options && typeof text === 'object') {
    options = text;
    text = '';
  }

  options = options || {};
  options.characters = (options.characters instanceof RegExp) ? options.characters : DEFAULT_CHARACTERS;
  options.separator = (options.separator instanceof RegExp) ? options.separator : DEFAULT_SEPARATOR;
  options.eliminateNumbers = (options.hasOwnProperty('eliminateNumbers')) ? Boolean(options.eliminateNumbers) : DEFAULT_ELIMINATE_NUMBERS;
  options.toLowerCase = (options.hasOwnProperty('toLowerCase')) ? Boolean(options.toLowerCase) : DEFAULT_TOLOWERCASE;
  options.emptyStrings = (options.hasOwnProperty('emptyStrings')) ? Boolean(options.emptyStrings) : DEFAULT_EMPTY_STRINGS;

  debug('characters', options.characters);
  debug('separator', options.separator);
  debug('eliminateNumbers', options.eliminateNumbers);
  debug('toLowerCase', options.toLowerCase);
  debug('emptyStrings', options.emptyStrings);

  if (text) {
    return tokenize(text, options);
  }

  return through2.obj(function (chunk, enc, callback) {

    var _chunk = (chunk.hasOwnProperty('text')) ? chunk.text : chunk;

    if (typeof _chunk !== 'string') {
      return callback(new Error('Chunk is not a string ' + JSON.stringify(chunk)));
    }

    var tokens = tokenize(_chunk, options);

    var response;

    if (typeof chunk === 'object') {
      chunk.text = tokens;
      response = chunk;
    } else {
      response = tokens;
    }

    return callback(null, response);

  });

}

function tokenize(text, options) {

  var tokens = text.split(options.separator).map(function (token) {
    token = token.replace(options.characters, '');
    if (options.eliminateNumbers) {
      token = token.replace(/^\d+$/, '');
    }
    if (options.toLowerCase) {
      token = token.toLowerCase();
    }
    return token;
  }).filter(function (token) {
    return !!token || options.emptyStrings;
  });

  return tokens;

}


/**
 * EXPORTS.
 */
module.exports = tokenizer;