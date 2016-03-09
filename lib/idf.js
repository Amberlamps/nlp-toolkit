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
function idfFactory(state) {

  return function idf() {

    return through2.obj(function (chunk, enc, callback) {
      state.idfSentences++;
      for (var key in chunk) {
        if (!state.idfCountTokens.hasOwnProperty(key)) {
          state.idfCountTokens[key] = 0;
        }
        state.idfCountTokens[key] += 1;
      }
      return callback(null, chunk);
    });

  }

}


/**
 * EXPORTS.
 */
module.exports = idfFactory;