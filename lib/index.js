/**
 * Nlp.
 */


'use strict';


/**
 * MODULES.
 */
var tokenizer = require('./tokenizer.js');
var prepare = require('./prepare.js');
var stopwords = require('./stopwords.js');
var stemmer = require('./stemmer.js');
var frequency = require('./frequency.js');
var idf = require('./idf.js');
var divide = require('./divide.js');
var serialize = require('./serialize.js');
var classifiers = require('./classifiers');
var crossValidation = require('./crossValidation.js');
var filters = require('./filters');
var calculate = require('./calculate');
var components = require('./components');


/**
 * EXPORTS.
 */
module.exports = {
  prepare: prepare,
  tokenizer: tokenizer,
  stopwords: stopwords,
  stemmer: stemmer,
  frequency: frequency,
  idf: idf,
  serialize: serialize,
  divide: divide,
  crossValidation: crossValidation,
  classifiers: classifiers,
  filters: filters,
  calculate: calculate,
  components: components
};