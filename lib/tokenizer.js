/**
 * Tokenize text.
 */


'use strict';


/**
 * MODULES.
 */
var through2 = require('through2');


/**
 * VARIABLES.
 */
var DEFAULT_CHARACTERS = /^\w/g;
var DEFAULT_SEPARATOR = /\s/g;
var DEFAULT_ELIMINATE_NUMBERS = false;
var DEFAULT_TOLOWERCASE = true;
var DEFAULT_EMPTY_STRINGS = false;


/**
 * FUNCTIONS.
 */
function tokenizer(options) {

  options = options || {};
  options.characters = (options.characters instanceof RegExp) ? options.characters : DEFAULT_CHARACTERS;
  options.separator = (options.separator instanceof RegExp) ? options.separator : DEFAULT_SEPARATOR;
  options.eliminateNumbers = (options.hasOwnProperty('eliminateNumbers')) ? Boolean(options.eliminateNumbers) : DEFAULT_ELIMINATE_NUMBERS;
  options.toLowerCase = (options.hasOwnProperty('toLowerCase')) ? Boolean(options.toLowerCase) : DEFAULT_TOLOWERCASE;
  options.emptyStrings = (options.hasOwnProperty('emptyStrings')) ? Boolean(options.emptyStrings) : DEFAULT_EMPTY_STRINGS;

  return through2.obj(function (chunk, enc, callback) {

    chunk = chunk.toString();
    var tokens = chunk.split(options.separator);

    return callback(null, tokens.map(function (token) {
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
    }));

  });

}


/**
 * EXPORTS.
 */
module.exports = tokenizer;