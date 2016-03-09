/**
 * Calculate results.
 */


'use strict';


/**
 * FUNCTIONS.
 */
function resultsFactory(state) {

  return function results() {
    var _idf = {};
    for (var key in state.idfCountTokens) {
      _idf[key] = state.idfSentences / state.idfCountTokens[key];
    }
    return _idf;
  };

}


/**
 * EXPORTS.
 */
module.exports = resultsFactory;