/**
 * Tokenize, stopword removal, stemming and frequency distribution.
 */

/**
 * MODULES.
 */
var nlp = require('../index.js');
var fs = require('fs');
var es = require('event-stream');


/**
 * NLP.
 */
fs.createReadStream('./texts/pride_prejudice.txt')
.pipe(es.split())
.pipe(nlp.tokenizer())
.pipe(nlp.stopwords({
  additionalWords: {
    all: ['mr', 'mrs', 'miss']
  }
}))
.pipe(nlp.stemmer())
.pipe(nlp.frequency())
.on('data', function (freqDist) {
  console.log(freqDist.slice(0, 10));
})
.on('error', function (err) {
  console.error(err);
});