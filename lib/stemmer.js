/**
 * Stem words.
 */


'use strict';


/**
 * MODULES.
 */
var through2 = require('through2');
var DanishStemmer = require('snowball-stemmer.jsx/dest/danish-stemmer.common.js').DanishStemmer;
var DutchStemmer = require('snowball-stemmer.jsx/dest/dutch-stemmer.common.js').DutchStemmer;
var EnglishStemmer = require('snowball-stemmer.jsx/dest/english-stemmer.common.js').EnglishStemmer;
var FinnishStemmer = require('snowball-stemmer.jsx/dest/finnish-stemmer.common.js').FinnishStemmer;
var FrenchStemmer = require('snowball-stemmer.jsx/dest/french-stemmer.common.js').FrenchStemmer;
var GermanStemmer = require('snowball-stemmer.jsx/dest/german-stemmer.common.js').GermanStemmer;
var HungarianStemmer = require('snowball-stemmer.jsx/dest/hungarian-stemmer.common.js').HungarianStemmer;
var ItalianStemmer = require('snowball-stemmer.jsx/dest/italian-stemmer.common.js').ItalianStemmer;
var NorwegianStemmer = require('snowball-stemmer.jsx/dest/norwegian-stemmer.common.js').NorwegianStemmer;
var PortugueseStemmer = require('snowball-stemmer.jsx/dest/portuguese-stemmer.common.js').PortugueseStemmer;
var RomanianStemmer = require('snowball-stemmer.jsx/dest/romanian-stemmer.common.js').RomanianStemmer;
var RussianStemmer = require('snowball-stemmer.jsx/dest/russian-stemmer.common.js').RussianStemmer;
var SpanishStemmer = require('snowball-stemmer.jsx/dest/spanish-stemmer.common.js').SpanishStemmer;
var SwedishStemmer = require('snowball-stemmer.jsx/dest/swedish-stemmer.common.js').SwedishStemmer;
var TurkishStemmer = require('snowball-stemmer.jsx/dest/turkish-stemmer.common.js').TurkishStemmer;
var debug = require('debug')('stemmer');


/**
 * VARIABLES.
 */
var stemmerLookup = {
  da: DanishStemmer,
  de: GermanStemmer,
  en: EnglishStemmer,
  fi: FinnishStemmer,
  fr: FrenchStemmer,
  hu: HungarianStemmer,
  nl: DutchStemmer,
  it: ItalianStemmer,
  no: NorwegianStemmer,
  pt: PortugueseStemmer,
  ro: RomanianStemmer,
  ru: RussianStemmer,
  es: SpanishStemmer,
  se: SwedishStemmer,
  tr: TurkishStemmer
};
var DEFAULT_STEMMER = 'en';


/**
 * FUNCTIONS.
 */
function stemmer(options) {

  options = options || {};
  options.lang = options.lang || DEFAULT_STEMMER;
  if (!stemmerLookup.hasOwnProperty(options.lang)) {
    throw new Error('Stemmer for ' + options.lang + ' does not exist.');
  }
  var stemmer = new stemmerLookup[options.lang]();

  debug('lang', options.lang);

  return through2.obj(function (chunk, enc, callback) {
    var _chunk = (typeof chunk === 'object' && Object.prototype.toString.call(chunk) !== '[object Array]') ? chunk.text : chunk;
    if (!_chunk || Object.prototype.toString.call(_chunk) !== '[object Array]') {
      return callback(new Error('Chunk is not an array ' + JSON.stringify(chunk)));
    }
    var tokens = _chunk.map(function (token) {
      return stemmer.stemWord(token);
    });
    var response;
    if (Object.prototype.toString.call(chunk) !== '[object Array]') {
      chunk.text = tokens;
      response = chunk;
    } else {
      response = tokens;
    }
    return callback(null, response);
  });
}


/**
 * EXPORTS.
 */
module.exports = stemmer;