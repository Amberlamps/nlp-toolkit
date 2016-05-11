/**
 * Calculate feature results.
 */


/**
 * FUNCTIONS.
 */
function features(data) {
  return data.map(function (classifier) {
    return classifier.map(function (_set) {
      return _set.reduce(calculateFeatures, {});
    }).reduce(calculateSets, {});
  }).map(function (result) {
    for (var key in result) {
      var entry = result[key];
      entry.precision = Math.round(entry.positive * 100 / entry.total) / 100;
      entry.accuracy = (Math.round(entry.positive * 100 / (entry.negative + entry.positive)) / 100) || 0;
    }
    return Object.keys(result).map(function (entry) {
      return {
        feature: entry,
        total: result[entry].total,
        positive: result[entry].positive,
        negative: result[entry].negative,
        precision: result[entry].precision,
        accuracy: result[entry].accuracy
      };
    });
  });
}

function calculateFeatures(p, c) {
  if (!p[c.feature]) {
    p[c.feature] = {
      total: 0,
      positive: 0,
      negative: 0
    };
  }
  p[c.feature].total += 1;
  var guess = c.guess.category || c.guess;
  if (guess === c.feature) {
    p[c.feature].positive += 1;
  } else {
    if (!p[guess]) {
      p[guess] = {
        total: 0,
        positive: 0,
        negative: 0
      };
    }
    p[guess].negative += 1;
  }
  return p;
}

function calculateSets(p, c) {
  for (var key in c) {
    if (!p[key]) {
      p[key] = {
        total: 0,
        positive: 0,
        negative: 0
      };
    }
    p[key].total += c[key].total;
    p[key].positive += c[key].positive;
    p[key].negative += c[key].negative;
  }
  return p;
}


/**
 * EXPORTS.
 */
module.exports = features;