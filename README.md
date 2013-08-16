# Natural Language Processing Toolkit for node.js #

## Overview ##

There is a more mature node.js module for NLP out there, but as both NLP and node.js are my hobbies I created this module to dig deeper into both topics.

## Installation ##

	npm install nlp-toolkit
	
## Usage ##

	var nlp = require("nlp-toolkit");
	
## Tokenizer ##

	> nlp.tokenize("That is a tokenizer.");
	[ 'That', 'is', 'a', 'tokenizer' ]
	
	> nlp.tokenize("That is a tokenizer.", {
	    stopwords: 'english',
		porter: true
	  };
	'token'