# Natural Language Processing Toolkit for node.js #

## Overview ##

There is a more mature node.js module for NLP out there, but as both NLP and node.js are my hobbies I created this module to dig deeper into both topics.

## Installation ##

```javascript
npm install nlp-toolkit
```

## Initialization ##

```javascript
var nlp = require("nlp-toolkit");
```

## Tokenizer ##

```javascript
> var tokenizer = new nlp.Tokenizer();
> tokenizer.tokenize("That is a tokenizer.");
[ 'That', 'is', 'a', 'tokenizer' ]

> var tokenizer = new nlp.Tokenizer({
	stopwords: 'english',
	porter: true
  });
> tokenizer.tokenize("That is a Tokenizer.");
'token'
```
	
## Frequence Distribution ##

### Initialization ###

Empty frequency distribution:

```javascript
var freqdist = new nlp.FreqDist();
```
	
Frequency distribution on letter:

```javascript
var freqdist = new nlp.FreqDist("Frequency distribution on letters");
```
	
Frequency distribution on tokens:

```javascript
var freqdist = new nlp.FreqDist([ "Frequency", "distribution", "on", "letters" ]);
```
	
Frequency distrubtion on texts:

```javascript
var freqdist = new nlp.FreqDist([[ "Frequence", "distribution" ], [ "on", "texts" ]]);
```
	
### Functions ###

_freqdist.keys()_

Returns array of keys.

_freqdist.values()_

Returns array of values.

_freqdist.keys([start [, end]])

Returns array of object with ``{ key: _key_, value: _value_ }´´.

+ _start_ - subarray of items beginning at _start_.
+ _end_ - end of subarray.

_freqdist.inc(item)_

Increment frequency distribution by _item_.

+ _item_ - Either number or string.

_freqdist.freq(item)_

Returns frequency of _item_. Return ``0`` if _item_ is not found.