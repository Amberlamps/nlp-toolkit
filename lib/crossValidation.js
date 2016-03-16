/**
 * Module to validate classifiers via cross validation.
 */


'use strict';


/**
 * MODULES.
 */
var through2 = require('through2');
var validateClassifier = require('./validateClassifier.js');


/**
 * FUNCTIONS.
 */
function crossValidation(options) {
  options = options || {};
  var classifiers = options.classifiers || [];
  classifiers = [].concat(classifiers);
  var results = [];
  return through2.obj(function (chunk, enc, callback) {
    results = classifiers.map(function (classifier) {
      return chunk.map(function (el, index) {
        var testData = [].concat.apply([], chunk.slice(index, index+1));
        var trainingData = [].concat.apply([], chunk.slice(0, index).concat(chunk.slice(index+1)));
        return validateClassifier({
          testSet: testData,
          trainingSet: trainingData,
          classifier: classifier
        });
      });
      // var __xxx = _results.reduce(function (p, c) {
      //   p.total += c.total;
      //   p.positive += c.positive;
      //   p.negative += c.negative;
      //   return p;
      // }, {
      //   total: 0,
      //   positive: 0,
      //   negative: 0
      // });
      // __xxx.accuracy = Math.round(__xxx.positive * 100 / __xxx.total) / 100;
      // results[results.length] = __xxx;
    });
    return callback();
  }, function (callback) {
    this.push(results);
    return callback();
  });
}


/**
 * EXPORTS.
 */
module.exports = crossValidation;