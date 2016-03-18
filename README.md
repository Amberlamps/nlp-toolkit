# Natural Language Processing Toolkit for node.js #

This module covers some basic nlp principles and implementations. The main focus is performance. When we deal with sample or training data in nlp, we quickly run out of memory. Therefore every implementation in this module is written as stream to only hold that data in memory that is currently processed at any step.

## Install ##

```
npm install nlp-toolkit
```

## Example ##

Frequency distribution of words in texts. Tokenize, remove stopwords, stem words, count words. Traditionally those steps happen sequentially. But we do not need to tokenize the whole text before removing stopwords.

```javascript
var nlp = require('nlp-toolkit');
var fs = require('fs');
var es = require('event-stream');

fs.createReadStream('./pride_prejudice.txt')
.pipe(es.split())
.pipe(nlp.tokenizer())
.pipe(nlp.stopwords())
.pipe(nlp.stemmer())
.pipe(nlp.frequency())
.on('data', function (freqDist) {
  console.log(freqDist.slice(0, 10));
})
.on('error', function (err) {
  console.error(err);
});
```

