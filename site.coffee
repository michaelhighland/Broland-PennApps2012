randomInRange = (x,y) ->
	return Math.floor( Math.random() * x ) + y

class window.Application
	GLOBAL_VAR = 1000
	
	constructor: ->
		@init()
		
	init: ->
		alert "hello world"
		
$ -> new Application