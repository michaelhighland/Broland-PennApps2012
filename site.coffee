randomInRange = (x,y) ->
	return Math.floor( Math.random() * x ) + y

class window.Application
	MASTER_STACK = new Array()
		
	constructor: ->
		@init()
		@hookUp()
		
	init: ->
		console.log "Initializaed Intention 1.0"
		#this is an ugly hack!
		interval = `setInterval("Application.prototype.tick()", 1000)`
		
	pushTask: (name,time) ->
		console.log "Pushing new task to master array with: "+name+" for "+time+" minutes."
		thisTask = [name, time]
		MASTER_STACK.push(thisTask)
		@renderList()
		
	tick: ->
		if MASTER_STACK.length > 0
				activeTime = @incrementActiveTime -1
				@renderList()
				if activeTime == 0
					alert "Time is Up!"
	
	incrementActiveTime: (x) ->
		console.log "incrementing active time by "+x
		if MASTER_STACK.length > 0
			activeTask = MASTER_STACK[MASTER_STACK.length-1]
			activeTime = activeTask[1]
			activeTime = (parseInt activeTime) + (parseInt x)
			MASTER_STACK[MASTER_STACK.length-1][1] = activeTime
			return activeTime
	
	hookUp: ->
		$("#gobutton").click =>
			taskName = $("#thedoing").val()
			taskTime = $("#thetime").val()
			@pushTask taskName, taskTime
			$("#thedoing").val ""
			$("#thetime").val ""
			@renderList()
		$("#donebutton").click =>
			MASTER_STACK.pop()
			@renderList()
		$("#moretimebutton").click =>
			if MASTER_STACK.length > 0
				@incrementActiveTime 5
				@renderList()
			
			
	renderList: ->
		$("#task-list").html ""
		if MASTER_STACK.length > 0
			@renderTask MASTER_STACK[i] for i in [MASTER_STACK.length-1..0]
	renderTask: (task) ->
		$("#task-list").append "<div>Name: "+task[0]+"- Time: "+task[1]+"<br/></div>"
		
			
		
	
$ -> new Application