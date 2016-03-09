/**
 * Nlp.
 */


'use strict';


/**
 * MODULES.
 */
var tokenizer = require('./tokenizer.js');
var sentences = require('./sentences.js');
var stopwords = require('./stopwords.js');
var stemmer = require('./stemmer.js');
var frequency = require('./frequency.js');
var idf = require('./idf.js');
var results = require('./results.js');


/**
 * FACTORY.
 */
function NlpFactory() {

  var state = {
    idfCountTokens: {},
    idfSentences: 0
  };

  return {
    sentences: sentences,
    tokenizer: tokenizer,
    stopwords: stopwords,
    stemmer: stemmer,
    frequency: frequency,
    idf: idf(state),
    results: results(state)
  };

}


/**
 * EXPORTS.
 */
module.exports = NlpFactory;