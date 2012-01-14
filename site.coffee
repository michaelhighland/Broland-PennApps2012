randomInRange = (x,y) ->
	return Math.floor( Math.random() * x ) + y

class window.Application
	GLOBAL_VAR = 1000
	MASTER_STACK = new Array()
	
	constructor: ->
		@init()
		@hookUpButtons()
		
	init: ->
		console.log "Initializaed Intention 1.0"
		
	pushTask: (name,time) ->
		console.log "Pushing new task to master array with: "+name" and "+time
		thisTask = [name,time]
		MASTER_STACK.push(thisTask)
	
	hookUpButtons: ->
		$("#gobutton").click ->
			pushTask $("#thedoing").val(), $("#thetime").val()
	
$ -> new Application