randomInRange = (x,y) ->
	return Math.floor( Math.random() * x ) + y

class window.Application
	MASTER_STACK = new Array()
	DISPLAY_TIME = 10
	FOOTER_OVERLAP = 50
	PAUSED = false
	ACTIVE = false
	NEW_TASK = null
	BACKUP_RATE = 30
	SPEED_SCALE = 30
	
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
		loopTime = 1000/SPEED_SCALE
		interval = `setInterval("Application.prototype.tick()", loopTime)`
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
			if @getActiveElapsedTime() % BACKUP_RATE == 0
				@updateDBTime()
			@renderList()
	
	incrementActiveTime: (x) ->
		if MASTER_STACK.length > 0
			activeTime = @getActiveTime()
			activeTime = (parseInt activeTime) + (parseInt x)
			@setActiveTime activeTime		
			
	updateDBTime: ->
		taskID = @getActiveID()
		actualTime = @getActiveElapsedTime()
		console.log "Updating task ID: "+taskID+" with "+actualTime+" in seconds."
		`$.ajax({
			url: 'scripts/functions.php?ajaxCall=updateTaskTime',
			data: {
				id : taskID, 
				time : actualTime, 
			},
			success: function(data){ 
				console.log("DB updated sucsess");
			},
			error: function(xhr,err) {
				alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				alert("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});`
		
	updateDBNewTask: (name,time) ->
		`$.ajax({
			url: 'scripts/functions.php?ajaxCall=insertUserTask',
			data: {
				uid : 33333, 
				taskName : name, 
				dateTime : 0, 
				targetTime: time, 
				actualTime : 0, 
				complete : 0
			},
			success: function(data){ 
			Application.prototype.setActiveID(data);
			},
			error: function(xhr,err) {
				alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				alert("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});`
		
	updateDBTaskComplete: ->
		taskID = @getActiveID()
		actualTime = @getActiveElapsedTime()
		console.log "Completing task"
		`$.ajax({
			url: 'scripts/functions.php?ajaxCall=completeTask',
			data: {
				id : taskID, 
				time : actualTime,
			},
			success: function(data){ 
				console.log("DB updated sucsess");
			},
			error: function(xhr,err) {
				alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				alert("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});`
		
	initStackFromDB: ->
		`$.ajax({
			url: 'scripts/functions.php?ajaxCall=retreiveOpenTasks',
			data: {
				uid : 33333, 
			},
			success: function(data){ 
			Application.prototype.setActiveID(data);
			},
			error: function(xhr,err) {
				alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				alert("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});`
		
	
	pushTask: (name,time) ->
		console.log "Pushing new task to master array with: "+name+" for "+time+" minutes."
		@updateDBNewTask name, time
		thisTask = [name, time, 0, -1]
		MASTER_STACK.push(thisTask)		
		@renderList()
	
	setActiveID: (id) ->
		MASTER_STACK[MASTER_STACK.length-1][3] = id	
		
	getActiveTask: ->
		return MASTER_STACK[MASTER_STACK.length-1]
	
	getActiveName: ->
		activeTask = @getActiveTask()
		return activeTask[0]
		
	getActiveTime: ->
		activeTask = @getActiveTask()
		return activeTask[1]
		
	getActiveElapsedTime: ->
		activeTask = @getActiveTask()
		return activeTask[2]
	
	getActiveID: ->
		activeTask = @getActiveTask()
		return activeTask[3]
		
	setActiveTime: (x) ->
		MASTER_STACK[MASTER_STACK.length-1][1] = x
		
	secondsToTimeString: (x) ->
		minutes = Math.floor(x/60)
		seconds = x % 60
		if seconds < 10
			seconds = "0"+seconds
		return minutes+":"+seconds
		
	incrementActiveElapsedTime: (x) ->
		MASTER_STACK[MASTER_STACK.length-1][2] += x
	
	taskComplete: ->
		@updateDBTaskComplete()
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
		$("#time-muncher").click =>
			if ACTIVE == true
				console.log "Updating active task"
				taskTime = $("#time-muncher").html()*60
				@incrementActiveTime taskTime
				PAUSED = false
				@renderList()
				@showTaskActiveSlide()
			else
				console.log "Creating new task"
				taskName = $("#thedoing").val()
				taskTime = $("#time-muncher").html()*60
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
				@incrementActiveTime 60
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
			$("#status").html "Time Left: "+(@secondsToTimeString task[1])+" Elapsed: "+(@secondsToTimeString task[2])+" ID:"+task[3]
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