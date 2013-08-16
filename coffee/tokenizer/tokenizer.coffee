Stopwords = require '../stopwords/stopwords.json'
Stemmer = require('porter-stemmer').stemmer

class Tokenizer

	# configuration object that is hidden from outside scope
	_config = {}
	
	# array of characters to strip off token
	#_punctuationMarks = [ "\\.", ",", "!", "\\?", "\"", "-", ":", "\\*", "#", "[0-9]", "\\+", "\\\\", "\\r", "\\t", "&", "_", "\\)", "\\(" ]
	_punctuationMarks = [ "[^a-zA-Z0-9]" ]

	constructor: (config = {}) ->
	
		_config = config
		
		# temporary stopwords array
		__stopwords = []
		
		# if stopwords option is selected in the configuration object, build an array of stopwords accordingly
		if _config.stopwords
			
			# helper function to find correct array of stopwords according to given language
			# return empty array if language is not available. this way the class stays fault tolerant.
			__getStopwords = (language) ->
			
				switch language
					when 'german' then Stopwords.German
					when 'english' then Stopwords.English
					else []
			
			# if option is an array, call helper function on every iteration
			if Object.prototype.toString.call(_config.stopwords) == '[object Array]'
				__stopwords = __stopwords.concat(__getStopwords(stopword)) for stopword in _config.stopwords
			
			# if option is "all", concat all stopwords available
			else if _config.stopwords == "all"
				__stopwords = [].concat.apply [], (value for key, value of Stopwords)
			
			# if option is a certain language, concat stopwords accordingly
			else
				__stopwords = __getStopwords _config.stopwords
			
		# store temporary array in configuration object
		_config.stopwords = __stopwords
		
		_tempSymbols = []
		
		# there might be additional symbols that you want to strip of. pass an array of symbols to 'cleanSymbols'
		if _config.cleanSymbols
			_tempSymbols = _tempSymbols.concat _config.cleanSymbols
			
		# usually you want to strip punctuation marks from your tokens. but you can keep them if 'keepPunctuationMarks' is set to true
		if !_config.keepPunctuationMarks
			_tempSymbols = _tempSymbols.concat _punctuationMarks
			
		if _tempSymbols.length > 0
			_config.cleanRegExp = new RegExp("(" + _tempSymbols.join("|") + ")", "g")
			
		@
	
	
	# cleaning the token with respect to the configuration
	_clean = (token) ->
	
		# set token to lower case if the attribute 'lowerCase' is set to true
		if _config.lowerCase
			token = token.toLowerCase()
			
		# set token to upper case if the attribute 'upperCase' is set to true
		if _config.upperCase
			token = token.toUpperCase()
		
		if _config.cleanRegExp
		
			# filter \uXXXX signs withhin words
			token = token.replace /u[0-9]{4}/, ""
			token = token.replace _config.cleanRegExp, ""
			
		token
	
	# function to actually tokenize a text
	# @return 	- two dimensional array when there is more than one sentence
	#			- one dimensional array when there is only on sentence
	#			- a string if it is just a word
	tokenize: (text) ->
	
		# create result set by splitting at line break, splitting at white space and running token through _clean() function.
		_result =
			for row in text.split /\\n+/
				_cleanedSentence =
					for token in row.split ' '
						_cleanedToken = _clean token
						if !@isStopword(_cleanedToken.replace "'", "") and _cleanedToken.length > 0
							Stemmer _cleanedToken
						else
				if _cleanedSentence.length > 0
					_cleanedSentence
				else
					
		# if there is only one sentence and it consists of only one word, return that word
		if _result.length == 1 and _result[0].length == 1
			_result[0][0]
			
		# if there is only one sentence, return that sentence
		else if _result.length == 1
			_result[0]
			
		# in any other case, return the whole result set
		else
			_result
	
	# check whether a token is a stopword
	# @return true if token is stopword, false if token is not a stopword
	isStopword: (token) ->
	
		-1 < _config.stopwords.indexOf token
		
module.exports = Tokenizer
	