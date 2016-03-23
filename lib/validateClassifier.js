/**
 * Module to validate classifiers.
 */


'use strict';


/**
 * MODULES.
 */
var debug = require('debug')('validateClassifier');


/**
 * FUNCTIONS.
 */
function validateClassifier(options) {

  options = options || {};
  var trainingSet = options.trainingSet || [];
  var testSet = options.testSet || [];
  var classifier = options.classifier;
  var _classifier = classifier();

  debug('trainingSet.length', trainingSet.length);
  debug('testSet.length', testSet.length);

  trainingSet.forEach(function (sentence) {
    if (sentence) {
      _classifier.learn(sentence, sentence.feature);
    }
  });

  return testSet.map(function (sentence) {
    if (!sentence) {
      return false;
    }
    return {
      feature: sentence.feature,
      guess: _classifier.classify(sentence)
    };
  }).filter(function (sentence) {
    return !!sentence;
  });

}


/**
 * EXPORTS.
 */
module.exports = validateClassifier;