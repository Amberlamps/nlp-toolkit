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

  debug('validateClassifier');

  options = options || {};
  var trainingSet = options.trainingSet || [];
  var testSet = options.testSet || [];
  var classifier = options.classifier;
  var _classifier = classifier();

  trainingSet.forEach(function (sentence) {
    _classifier.learn(sentence, sentence.feature);
  });

  return testSet.map(function (sentence) {
    return {
      feature: sentence.feature,
      guess: _classifier.classify(sentence)
    };
  });

}


/**
 * EXPORTS.
 */
module.exports = validateClassifier;