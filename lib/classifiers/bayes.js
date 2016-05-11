/**
 * Bayes classifier.
 */


'use strict';


/**
 * MODULES.
 */
var bayes = require('bayes_fixed');


/**
 * FUNCTIONS.
 */
function bayesClassifier(trainingSet) {
  var classifier = bayes();
  return {
    learn: function learn(sentence, feature) {
      var _sentence = (typeof sentence === 'object' && Object.prototype.toString.call(sentence) !== '[object Array]') ? sentence.text : sentence;
      if (typeof _sentence !== 'string') {
        _sentence = _sentence.join(' ');
      }
      classifier.learn(_sentence, feature);
    },
    classify: function classify(sentence) {
      var _sentence = (typeof sentence === 'object' && Object.prototype.toString.call(sentence) !== '[object Array]') ? sentence.text : sentence;
      if (typeof _sentence !== 'string') {
        _sentence = _sentence.join(' ');
      }
      return classifier.categorize(_sentence);
    }
  };
}


/**
 * EXPORTS.
 */
module.exports = bayesClassifier;