class FreqDist

	constructor: (init) ->
	
		@_items = {}
		@_sorted = []
	
		if init?
			if Object.prototype.toString.call(init) == "[object Array]"
				if Object.prototype.toString.call(init[0]) == "[object Array]"
					init = init.reduce(
						(p, c) -> p.concat c
						[]
					)
				for item in init
					if Object.prototype.toString.call(item) == "[object String]" or Object.prototype.toString.call(item) == "[object Number]"
						if @_items[item]
							@_items[item]++
						else
							@_items[item] = 1
					else
						console.log "neither string nor number in array"
						console.log "found: " + Object.prototype.toString.call(item)
						return false
			else if Object.prototype.toString.call(init) == "[object String]"
				init = init.toLowerCase()
				for w in init
					if @_items[w]
						@_items[w]++
					else
						@_items[w] = 1
			else
				console.log "not iterable"
				return false
		
			@_sorted = @_sort()
		@
		
	_sort: () ->
	
		(key: k, value: v for k, v of @_items).sort (a, b) -> b.value - a.value
		
	_iterate: (key, start, end) ->
	
		_a = (item[key] for item in @_sorted)
		if end?
			_a.slice start, end
		else if start?
			_a.slice start
		else
			_a
		
	inc: (item) ->
	
		if Object.prototype.toString.call(item) == "[object String]" or Object.prototype.toString.call(item) == "[object Number]"
			if @_items[item]
				@_items[item]++
			else
				@_items[item] = 1
			@_sorted = @_sort()
			@
		else
			console.log "can only increment string or number"
			false
		
	items: (start, end) ->
	
		if end?
			@_sorted.slice start, end
		else if start?
			@_sorted.slice start
		else
			@_sorted
		
	keys: (start, end) ->
	
		@_iterate "key", start, end
		
	values: (start, end) ->
	
		@_iterate "value", start, end
		
	freq: (item) ->
	
		if @_items[item]
			@_items[item]
		else
			0

module.exports = FreqDist