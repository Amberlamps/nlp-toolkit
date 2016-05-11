/**
 * Calculate standard derivation.
 */


'use strict';


/**
 * MODULES.
 */
var math = require('mathjs');


/**
 * FUNCTIONS.
 */
function derivation(data, options) {
  var derivs = options.derivation || 1;
  return data.map(function (classifier) {
    var results = {
      lost: 0,
      positives: 0,
      negatives: 0,
      won: 0,
      positivesWon: 0,
      negativesWon: 0
    };
    classifier.forEach(function (_set) {
      _set.forEach(function (entry) {
        var guess = entry.guess.category || entry.guess;
        entry.guess.distribution.sort(function (a, b) {
          return (a.prob > b.prob) ? -1 : 1;
        });
        var _deriv = math.std(entry.guess.distribution.map(function (cat) {
          return cat.prob;
        }));
        if (entry.guess.distribution[0].prob - (_deriv * derivs) <= entry.guess.distribution[1].prob) {
          results.lost++;
          if (guess === entry.feature) {
            results.positives++;
          } else {
            results.negatives++;
          }
        } else {
          results.won++;
          if (guess === entry.feature) {
            results.positivesWon++;
          } else {
            results.negativesWon++;
          }
        }
      });
    });
    results.positives = results.positives / results.lost;
    results.negatives = results.negatives / results.lost;
    results.positivesWon = results.positivesWon / results.won;
    results.negativesWon = results.negativesWon / results.won;
    return results;
  });
}


/**
 * EXPORTS.
 */
module.exports = derivation;