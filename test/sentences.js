/**
 * Test case for nlp.sentences.
 */


/**
 * MODULES.
 */
var assert = require('chai').assert;
var fs = require('fs');
var NlpToolkit = require('../index.js');
var es = require('event-stream');
var path = require('path');


/**
 * TESTS.
 */
// describe('nlp.sentences', function() {
//   describe('# of sentences', function () {
//     it('should have 7 sentences', function (done) {
//       var nlp = NlpToolkit();
//       var sentences = [];
//       fs.createReadStream(path.resolve(__dirname, './texts.txt'))
//       .pipe(es.split())
//       .pipe(nlp.sentences())
//       .on('data', function (sentence) {
//         sentences[sentences.length] = sentence;
//       })
//       .on('end', function () {
//         assert.lengthOf(sentences, 7, 'array has length of 7');
//         done();
//       })
//       .on('error', function (err) {
//         throw err;
//       });
//     });
//   });
// });