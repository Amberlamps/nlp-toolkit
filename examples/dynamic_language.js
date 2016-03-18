/**
 * Stopword removal and stemming based on dynamic properties.
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
fs.createReadStream('./texts/multilanguage.txt')
.pipe(es.split())
.pipe(nlp.prepare(function (sentence) {
  var parts = sentence.split('|');
  return {
    lang: parts[0],
    text: parts[1]
  }
}))
.pipe(nlp.tokenizer({
  characters: /[^\wäöüß]/g
}))
.pipe(nlp.stopwords({
  lang: function (sentence) {
    return sentence.lang;
  }
}))
.pipe(nlp.stemmer({
  lang: function (sentence) {
    return sentence.lang;
  }
}))
.on('data', function (sentence) {
  console.log(sentence.text);
})
.on('error', function (err) {
  console.error(err);
});