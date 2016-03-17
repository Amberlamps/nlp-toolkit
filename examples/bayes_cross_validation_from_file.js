/**
 * Reading data from a text file.
 * Training and testing bayes classifier
 * using cross validation.
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
fs.createReadStream('./sentiment.txt')
.pipe(es.split())
.pipe(nlp.prepare(function (sentence) {
  var parts = sentence.split('|');
  return {
    text: parts[1],
    feature: parts[0]
  }
}))
.pipe(nlp.tokenizer())
.pipe(nlp.stopwords())
.pipe(nlp.stemmer())
.pipe(nlp.divide({
  sets: [1, 1, 1, 1]
}))
.on('data', function (sentence) {
  console.log(sentence);
})
.on('error', function (err) {
  console.error(err);
});