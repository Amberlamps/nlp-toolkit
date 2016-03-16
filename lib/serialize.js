/**
 * Serialize.
 */


'use strict';


/**
 * MODULES.
 */
var through2 = require('through2');
var fs = require('fs');


/**
 * FUNCTIONS.
 */
function max(filename) {
  var output = fs.createWriteStream(filename);
  return through2.obj(function (chunk, enc, callback) {
    output.write(JSON.stringify(chunk) + '\n');
    return callback(null, chunk);
  });
}


/**
 * EXPORTS.
 */
module.exports = max;