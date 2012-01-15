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
	SPEED_SCALE = 10
	
	EXCLAMATIONS = [
		"Huzzah!"
		"Gadzooks!"
		"Sweet Baby Jesus!"
		"Time Flies!"
		"Cracking!"
	]
	
	QUESTIONS = [
		"What will you do now?",
		"Now what?",
		"State your intention",
		"Why are you here?"
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
		@randomizePrompt()
		@initStackFromDB()
		@renderHistory()
		@renderList()
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
				if @getActiveTime() <= 0
					@setActiveTime 0
					if not PAUSED
						PAUSED = true
						theword = EXCLAMATIONS[Math.floor(Math.random() * EXCLAMATIONS.length)]
						alert theword+" It's time to check in."
						@deployOverlay()
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
		remainingTime = @getActiveTime()
		console.log "Updating task ID: "+taskID+" with "+actualTime+" in seconds."
		`$.ajax({
			url: 'scripts/functions.php?ajaxCall=updateTaskTime',
			data: {
				id : taskID, 
				elapsed: actualTime, 
				remaining: remainingTime
			},
			success: function(data){ 
				console.log("DB updated sucsess");
			},
			error: function(xhr,err) {
				console.log("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				console.log("responseText: "+xhr.responseText);
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
				remainingTime: time, 
				complete : 0
			},
			success: function(data){ 
			Application.prototype.setActiveID(data);
			},
			error: function(xhr,err) {
				console.log("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				console.log("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});`
		
	updateDBTaskComplete: ->
		taskID = @getActiveID()
		elapsedTime = @getActiveElapsedTime()
		remainingTime = @getActiveTime()
		console.log "Completing task"
		`$.ajax({
			url: 'scripts/functions.php?ajaxCall=completeTask',
			data: {
				id : taskID, 
				elapsed : elapsedTime,
				remaining : remainingTime
			},
			success: function(data){ 
				console.log("DB updated sucsess");
			},
			error: function(xhr,err) {
				console.log("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				console.log("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});`
		
	initStackFromDB: ->
		`$.ajax({
			url: 'scripts/functions.php?ajaxCall=getOpenTasks',
			dataType: 'json',
			data: {
				uid : 33333, 
			},
			success: function(data){ 
				Application.prototype.parseStackData(data);
			},
			error: function(xhr,err) {
				console.log("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				console.log("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});`
		
	renderHistory: ->
		`$.ajax({
			url: 'scripts/functions.php?ajaxCall=getHistory',
			dataType: 'json',
			data: {
				uid : 33333, 
			},
			success: function(data){ 
				Application.prototype.unpackHistory(data);
			},
			error: function(xhr,err) {
				console.log("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				console.log("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});`
		
	unpackHistory: (data) ->
		$("#history-list").html ""
		@outputHistory tasks for tasks in data	
		
	outputHistory: (task) ->
		prettyDate = new Date(task.dateTime)
		weekday = ['SUN','MON','TUE','WED','THR','FRI','SAT']
		finalDate = weekday[prettyDate.getDay()]
		finalDate += " "+(prettyDate.getHours()%12)+":"
		if prettyDate.getMinutes() < 10
			finalDate += "0"
		finalDate += prettyDate.getMinutes()
		if prettyDate.getHours() > 12
			finalDate += " PM"
		else
			finalDate += " AM"
	
		historyEntry = "<li>"
		historyEntry += "<span class='history-date'>"+finalDate+"</span>"+task.taskName
		historyEntry +=	"<span class='history-elapsed'>"+@secondsToTimeString(parseInt task.actualTime)+"</span>"
		historyEntry +=	"<span class='history-slash'>/</span>"
		historyEntry += "<span class='history-target'>"+@secondsToTimeString(parseInt task.targetTime)+"</span>"
		historyEntry += "<span class='history-ratio'>"+task.ratio+"</span>"
		historyEntry +=	"</li>"
		$("#history-list").append historyEntry
		
	parseStackData: (data) ->
		@restoreTask tasks for tasks in data
		if data.length > 0
			@showTaskActiveSlide()
			ACTIVE = true
			PAUSED = false
		
	restoreTask: (task) ->
		thisTask = [task.taskName, parseInt(task.remainingTime), parseInt(task.actualTime), parseInt(task.id), parseInt(task.targetTime)]
		console.log thisTask
		MASTER_STACK.push(thisTask)	
		@renderList()
			
	pushTask: (name,time) ->
		console.log "Pushing new task to master array with: "+name+" for "+time+" minutes."
		@updateDBNewTask name, time
		## [Name,ActiveTime,ElapsedTime,TaskID,TargetTime]
		thisTask = [name, time, 0, -1, time]
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
		
	getGoalTime: ->
		activeTask = @getActiveTask()
		return activeTask[4]
		
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
		@renderHistory()
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
			@hideOverlay()
			DISPLAY_TIME = 10
			@showTaskTimeSlide()
		$(".replace-task-button").click =>
			@hideOverlay()
			ACTIVE = false
			PAUSED = true
			@showTaskInProgNameSlide()
		$(".complete-task-button").click =>
			@hideOverlay()
			@taskComplete()
			
	deployOverlay: ->
		$("#overlay").fadeIn()
		$("#overlay h1").html @getActiveName()
	
	hideOverlay: ->
		$("#overlay").fadeOut()
			
	incrementDisplayTime: ->
		DISPLAY_TIME++
		$("#time-muncher").html DISPLAY_TIME
	decrementDisplayTime: ->
		DISPLAY_TIME--
		$("#time-muncher").html DISPLAY_TIME
		
	randomizePrompt: ->	
		theword = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]
		$("#prompt").html theword
	
	showTaskNameSlide: ->
		#the first slide
		##random text!
		@randomizePrompt()
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
			$("#change-intention").fadeIn()
		else
			name = @getActiveName()
			$("#prompt").html "Time to "+name
			$("#time-comment").html "How much longer do you need?"
			$("#change-intention").fadeOut()
		
		$("#slide-holder").animate
			left: "-700"
			500
			"easeInQuad"	

	showTaskActiveSlide: ->
		#the third slide
		name = @getActiveName()
		$("#prompt").html "go "+name+"!"
		$("#slide-holder").animate
			left: "-1400"
			500
			"easeInQuad"
		
	renderList: ->
		if MASTER_STACK.length > 0
			task = @getActiveTask()
			## [Name,ActiveTime,ElapsedTime,TaskID,TargetTime]
			$("#time-remaining").html (@secondsToTimeString task[1])
			$("#elapsed-time").html (@secondsToTimeString task[2])
			$("#original-target").html (@secondsToTimeString task[4])
			$("#task-list").html ""
		if MASTER_STACK.length > 1
			$("#pending-tasks").fadeIn()
			@renderTask MASTER_STACK[i] for i in [MASTER_STACK.length-2..0]
		else
			$("#pending-tasks").fadeOut()
	renderTask: (task) ->
		$("#task-list").append "<li>"+task[0]+"</li>"
		opacity = 1.0
		$("#task-list").children().each ->
			$(this).css "opacity", opacity
			opacity -= 0.15
			opacity = Math.max 0, opacity
			
$ -> new Application