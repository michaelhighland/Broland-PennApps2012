randomInRange = (x,y) ->
	return Math.floor( Math.random() * x ) + y

class window.Application
	MASTER_STACK = new Array()
	DISPLAY_TIME = 10
	FOOTER_OVERLAP = 50
	PAUSED = false
	ACTIVE = false
	NEW_TASK = null
	
	EXCLAMATIONS = [
		"Huzzah!"
		"Gadzooks!"
		"Sweet Baby Jesus!"
		"Time Flies!"
	]
		
	constructor: ->
		@init()
		@primeButtons()
		@primeFoldSize()
		
	init: ->
		console.log "Initializaed Intention 1.0"
		#this is an ugly hack!
		interval = `setInterval("Application.prototype.tick()", 1000)`
	primeFoldSize: ->
		# Resize on init
		$("#above-the-fold").height($(window).height()-FOOTER_OVERLAP)
		# And always on resizing the window!
		$(window).resize ->
			$("#above-the-fold").height($(window).height()-FOOTER_OVERLAP)
		
	tick: ->
		if MASTER_STACK.length > 0
			@incrementActiveElapsedTime 1
			if not PAUSED
				@incrementActiveTime -1
				if @getActiveTime() == 0
					PAUSED = true
					theword = EXCLAMATIONS[Math.floor(Math.random() * EXCLAMATIONS.length)]
					alert theword+" It's time to check in."
					@showTaskExpiredSlide()
			@renderList()
	
	incrementActiveTime: (x) ->
		if MASTER_STACK.length > 0
			activeTime = @getActiveTime()
			activeTime = (parseInt activeTime) + (parseInt x)
			@setActiveTime activeTime
			

	pushTask: (name,time) ->
		console.log "Pushing new task to master array with: "+name+" for "+time+" minutes."
		thisTask = [name, time, 0]
		MASTER_STACK.push(thisTask)
		@renderList()
		
	getActiveTask: ->
		return MASTER_STACK[MASTER_STACK.length-1]
	
	getActiveName: ->
		activeTask = @getActiveTask()
		return activeTask[0]
		
	getActiveTime: ->
		activeTask = @getActiveTask()
		return activeTask[1]
		
	setActiveTime: (x) ->
		MASTER_STACK[MASTER_STACK.length-1][1] = x
		
	incrementActiveElapsedTime: (x) ->
		MASTER_STACK[MASTER_STACK.length-1][2] += x
	
	taskComplete: ->
		MASTER_STACK.pop()
		@renderList()
		## refresh new tiem
		if MASTER_STACK.length > 0
			if @getActiveTime() == 0
				PAUSED = true
				@showTaskTimeSlide()
			else	
				PAUSED = false
				@showTaskActiveSlide()
		else
			@showTaskNameSlide()
			ACTIVE = false
			
	primeButtons: ->
		## navigate to first and second slides		
		$(".set-time-button").click =>
			@showTaskTimeSlide()
		$(".set-name-button").click =>
			if ACTIVE == false 
				@showTaskNameSlide()
		## set time value
		$(".time-plus-button").mousedown =>
			@incrementDisplayTime()
		$(".time-minus-button").mousedown =>
			@decrementDisplayTime()

		# create new task
		$("#create-task-button").click =>
			if ACTIVE == true
				console.log "Updating active task"
				taskTime = $("#time-muncher").html()
				@incrementActiveTime taskTime
				PAUSED = false
				@renderList()
				@showTaskActiveSlide()
			else
				console.log "Creating new task"
				taskName = $("#thedoing").val()
				taskTime = $("#time-muncher").html()
				@pushTask taskName, taskTime
				$("#thedoing").val ""
				DISPLAY_TIME = 10
				@renderList()
				@showTaskActiveSlide()
				ACTIVE = true
				PAUSED = false
		
		## add 1 minute to time! "snooze"	
		$(".minute-plus-button").click =>
			if MASTER_STACK.length > 0
				@incrementActiveTime 1
				@renderList()
				
		## task resolution
		$(".add-time-button").click =>
			DISPLAY_TIME = 10
			@showTaskTimeSlide()
		$(".replace-task-button").click =>
			ACTIVE = false
			PAUSED = true
			@showTaskInProgNameSlide()
		$(".complete-task-button").click =>
			@taskComplete()
			
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
		
	showTaskInProgNameSlide: ->
		#the first slide
		$("#prompt").html "Now what will you do?"
		$("#slide-holder").animate
			left: "0"
			500
			"easeInQuad"	
			
	showTaskTimeSlide: ->
		#the second slide
		$("#time-muncher").html DISPLAY_TIME
		if $("#thedoing").val()
			$("#prompt").html ($("#thedoing").val())+"? ok."
			$("#time-comment").html "How long will that take?"
		else
			name = @getActiveName()
			$("#prompt").html "Time to "+name
			$("#time-comment").html "How much longer do you need?"
		$("#slide-holder").animate
			left: "-600"
			500
			"easeInQuad"	

	showTaskActiveSlide: ->
		#the third slide
		name = @getActiveName()
		$("#prompt").html "go "+name+"!"
		$("#slide-holder").animate
			left: "-1200"
			500
			"easeInQuad"
			
	showTaskExpiredSlide: ->
		$("#slide-holder").animate
			left: "-1800"
			500
			"easeInQuad"
		
	renderList: ->
		if MASTER_STACK.length > 0
			task = @getActiveTask()
			$("#status").html "Time Left: "+task[1]+" Elapsed: "+task[2]
			$("#task-list").html ""
		if MASTER_STACK.length > 1
			@renderTask MASTER_STACK[i] for i in [MASTER_STACK.length-2..0]
	renderTask: (task) ->
		$("#task-list").append "<div>"+task[0]+"</div>"
		opacity = 1.0
		$("#task-list").children().each ->
			$(this).css "opacity", opacity
			opacity -= 0.15
			opacity = Math.max 0, opacity
			
		
			
		
	
$ -> new Application