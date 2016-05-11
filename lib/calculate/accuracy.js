/**
 * Module to calculate accuracy of classifiers.
 */


/**
 * FUNCTIONS.
 */
function accuracy(data) {
  return data.map(function (classifier) {
    return classifier.map(function (_set) {
      return _set.reduce(calculateSentences, {
        total: 0,
        positive: 0,
        negative: 0
      });
    }).reduce(calculateSets, {
      total: 0,
      positive: 0,
      negative: 0
    });
  }).map(function (result) {
    result.accuracy = Math.round(result.positive * 100 / result.total) / 100;
    return result;
  });
}

function calculateSentences(p, c) {
  p.total += 1;
  var guess = c.guess.category || c.guess;
  if (guess === c.feature) {
    p.positive += 1;
  } else {
    p.negative += 1;
  }
  return p;
}

function calculateSets(p, c) {
  p.total += c.total;
  p.positive += c.positive;
  p.negative += c.negative;
  return p;
}


/**
 * EXPORTS.
 */
module.exports = accuracy;