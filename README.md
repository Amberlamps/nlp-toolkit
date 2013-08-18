# Natural Language Processing Toolkit for node.js #

## Overview ##

There is a more mature node.js module for NLP out there, but as both NLP and node.js are my hobbies I created this module to dig deeper into both topics.

## Installation ##

	npm install nlp-toolkit
	
## Usage ##

	var nlp = require("nlp-toolkit");
	
## Tokenizer ##

	> var tokenizer = new nlp.Tokenizer();
	> tokenizer.tokenize("That is a tokenizer.");
	[ 'That', 'is', 'a', 'tokenizer' ]
	
	> var tokenizer = new nlp.Tokenizer({
	    stopwords: 'english',
		porter: true
	  });
	> tokenizer.tokenize("That is a Tokenizer.");
	'token'