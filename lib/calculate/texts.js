/**
 * Calculate texts.
 */


'use strict';


/**
 * MODULES.
 */


/**
 * FUNCTIONS.
 */
function texts(data, options) {
  options = options || {};
  var amount = options.amount || 5;
  return data.map(function (classifier) {
    var results = {};
    classifier.forEach(function (_set) {
      _set.forEach(function (entry) {
        var guess = entry.guess.category || entry.guess;
        var feature = entry.feature;
        if (guess == feature) {
          var dist = entry.guess.distribution.filter(function (prob) {
            return prob.cat === guess
          })[0]
          if (dist) {
            if (!results.hasOwnProperty(guess)) {
              results[guess] = [];
            }
            results[guess].push({
              prob: dist.prob,
              original: entry.guess.original
            });
          }
        }
      });
    });
    // for (var key in results) {
    //   results[key].sort(function (a, b) {
    //     return (a.prob > b.prob) ? -1 : 1;
    //   });
    //   var obj = {
    //     top: results[key].slice(0, amount),
    //     bottom: results[key].slice(0 - amount)
    //   };
    //   results[key] = obj;
    // }
    return results;
  });
}


/**
 * EXPORTS.
 */
module.exports = texts;