/**
 * Create idf.
 */


'use strict';


/**
 * MODULES.
 */
var through2 = require('through2');


/**
 * FUNCTIONS.
 */
function idf() {

  var countTokens = {};
  var sentences = 0;

  return through2.obj(function (chunk, enc, callback) {
    sentences++;
    for (var key in chunk) {
      if (!countTokens.hasOwnProperty(key)) {
        countTokens[key] = 0;
      }
      countTokens[key] += 1;
    }
    return callback(null, chunk);
  });

}


/**
 * EXPORTS.
 */
module.exports = idf;