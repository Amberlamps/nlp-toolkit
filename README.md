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

## Modules ##

### Tokenizer ###

```javascript
.pipe(nlp.tokenizer(options))
```

`options`:

| attribute | type | description |
|-----------|------|-------------|
| characters | RegExp | regular expression that describes what characters to strip of off (default `/[^\w]/g`). |
| separator | RegExp |  regular expression that describes where to split words (default `/\s/g`). |
| eliminateNumbers| boolean | discard tokens that only contain numbers (default `false`). |
| toLowerCase | boolean |  transform every token to lower case (default `true`). |
| emptyStrings | boolean |  keep empty string when through some previous steps tokens result in length === 0 (default `false`). |

Tokenizer also work in a non-stream context:

```javascript
var tokens = nlp.tokenizer(string, options);
```

### Stopwords ###

```javascript
.pipe(nlp.stopwords(options))
```

`options`:

| attribute | type | description |
|-----------|------|-------------|
| defaultLang | string | default language if processed object does not provide a `lang` attribute (default `en`). |
| additionalWords | object | add additional stopwords to the list of stopwords |

`additionalWords`:

| attribute | type | description |
|-----------|------|-------------|
| all | array | list of stopwords to add to every language |
| default | array | list of stopwords if language is not supported |
| _lang_ | array | list of stopwords specific to _lang_ |

Supported languages: `da, de, en, es, fi, fr, hu, it, nl, no, pt, ro, ru, se, tr`.

Stopwords also work in a non-stream context:

```javascript
nlp.stopwords(sentence, options)
.then(function (tokens) {}})
.catch(function (err) { console.error(err); });
```

### Stemmer ###

```javascript
.pipe(nlp.stemmer(options))
```

`options`:

| attribute | type | description |
|-----------|------|-------------|
| defaultStemmer | string | default stemmer for language if processed object does not provide a `lang` attribute (default `en`). |

Supported languages: `da, de, en, es, fi, fr, hu, it, nl, no, pt, ro, ru, se, tr`.

Stopwords also work in a non-stream context:

```javascript
var tokens = nlp.stemmer(sentence, options);
```

This module uses the stemmer implementation of [Snowball-Stemmer](https://github.com/shibukawa/snowball-stemmer.jsx).

### Frequency Distribution ###

```javascript
.pipe(nlp.frequency())
```