randomInRange = (x,y) ->
	return Math.floor( Math.random() * x ) + y

class window.Application
	MASTER_STACK = new Array()
	DISPLAY_TIME = 5
		
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
					@showTaskTimeUpSlide()
	
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
			taskTime = $("#time-muncher").html()
			@pushTask taskName, taskTime
			$("#thedoing").val ""
			@renderList()
			@showTaskActiveSlide taskName
			
		$(".donebutton").click =>
			MASTER_STACK.pop()
			@renderList()
			if MASTER_STACK.length > 0
				activeTask = MASTER_STACK[MASTER_STACK.length-1]
				activeName = activeTask[0]
				@showTaskActiveSlide activeName
			else
				@showTaskNameSlide()
			
		$(".moretimebutton").click =>
			if MASTER_STACK.length > 0
				@incrementActiveTime 5
				@renderList()
		$(".time-slide").click =>
			@showTaskTimeSlide()
		$(".task-slide").click =>
			@showTaskNameSlide()
		$(".time-plus").mousedown =>
			@incrementDisplayTime()
		$(".time-minus").mousedown =>
			@decrementDisplayTime()
		
	incrementDisplayTime: ->
		DISPLAY_TIME++
		$("#time-muncher").html DISPLAY_TIME
	decrementDisplayTime: ->
		DISPLAY_TIME--
		$("#time-muncher").html DISPLAY_TIME
		
	showTaskNameSlide: ->
		#the first slide
		$("#prompt").html "What will you do now?"
		$("#slide-holder").animate
			left: "0"
			500
			"easeInQuad"
			
	showTaskTimeSlide: ->
		#the second slide
		$("#time-muncher").html DISPLAY_TIME
		$("#prompt").html "How long should that take?"
		$("#slide-holder").animate
			left: "-600"
			500
			"easeInQuad"	
	
	showTaskActiveSlide: (name) ->
		#the third slide
		$("#prompt").html name
		$("#slide-holder").animate
			left: "-1200"
			500
			"easeInQuad"
			
	showTaskTimeUpSlide: ->
		$("#slide-holder").animate
			left: "-1800"
			500
			"easeInQuad"
		
	renderList: ->
		$("#task-list").html ""
		if MASTER_STACK.length > 0
			@renderTask MASTER_STACK[i] for i in [MASTER_STACK.length-1..0]
	renderTask: (task) ->
		$("#task-list").append "<div>Name: "+task[0]+"- Time: "+task[1]+"<br/></div>"
		
			
		
	
$ -> new Application