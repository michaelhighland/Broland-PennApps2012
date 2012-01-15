(function() {
  var randomInRange;

  randomInRange = function(x, y) {
    return Math.floor(Math.random() * x) + y;
  };

  window.Application = (function() {
<<<<<<< Updated upstream
    var ACTIVE, BACKUP_RATE, DISPLAY_TIME, EXCLAMATIONS, FOOTER_OVERLAP, MASTER_STACK, NEW_TASK, PAUSED, QUESTIONS, SPEED_SCALE, UID;
=======
    var ACTIVE, BACKUP_RATE, DISPLAY_TIME, EXCLAMATIONS, FOOTER_OVERLAP, MASTER_STACK, NEW_TASK, PAUSED, SPEED_SCALE;
>>>>>>> Stashed changes

    MASTER_STACK = new Array();

    DISPLAY_TIME = 10;

    FOOTER_OVERLAP = 50;

    PAUSED = false;

    ACTIVE = false;

    NEW_TASK = null;

    BACKUP_RATE = 30;

<<<<<<< Updated upstream
    SPEED_SCALE = 10;

    UID = 33333;

    EXCLAMATIONS = ["Huzzah!", "Gadzooks!", "Sweet Baby Jesus!", "Time Flies!", "Cracking!"];

    QUESTIONS = ["What will you do now?", "Now what?", "State your intention", "Why are you here?"];

=======
    SPEED_SCALE = 30;

    EXCLAMATIONS = ["Huzzah!", "Gadzooks!", "Sweet Baby Jesus!", "Time Flies!", "Cracking!"];

>>>>>>> Stashed changes
    function Application() {
      this.init();
      this.primeButtons();
      this.primeFoldSize();
    }

    Application.prototype.init = function() {
      var interval, loopTime;
      console.log("Initializaed Intention 1.0");
      loopTime = 1000 / SPEED_SCALE;
      interval = setInterval("Application.prototype.tick()", loopTime);
      this.randomizePrompt();
      this.initStackFromDB();
      this.renderHistory();
      this.renderList();
      return this.renderStats();
    };

    Application.prototype.primeFoldSize = function() {
      $("#above-the-fold").height($(window).height() - FOOTER_OVERLAP);
      return $(window).resize(function() {
        return $("#above-the-fold").height($(window).height() - FOOTER_OVERLAP);
      });
    };

    Application.prototype.tick = function() {
      var theword;
      if (MASTER_STACK.length > 0) {
        this.incrementActiveElapsedTime(1);
        if (!PAUSED) {
          this.incrementActiveTime(-1);
          if (this.getActiveTime() <= 0) {
            this.setActiveTime(0);
            if (!PAUSED) {
              PAUSED = true;
              theword = EXCLAMATIONS[Math.floor(Math.random() * EXCLAMATIONS.length)];
              alert(theword + " It's time to check in.");
              this.deployOverlay();
            }
          }
        }
        if (this.getActiveElapsedTime() % BACKUP_RATE === 0) this.updateDBTime();
        return this.renderList();
      }
    };

    Application.prototype.incrementActiveTime = function(x) {
      var activeTime;
      if (MASTER_STACK.length > 0) {
        activeTime = this.getActiveTime();
        activeTime = (parseInt(activeTime)) + (parseInt(x));
        return this.setActiveTime(activeTime);
      }
    };

    Application.prototype.updateDBTime = function() {
      var actualTime, remainingTime, taskID;
      taskID = this.getActiveID();
      actualTime = this.getActiveElapsedTime();
      remainingTime = this.getActiveTime();
      console.log("Updating task ID: " + taskID + " with " + actualTime + " in seconds.");
      return $.ajax({
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
		});;
    };

    Application.prototype.updateDBNewTask = function(name, time) {
      return $.ajax({
			url: 'scripts/functions.php?ajaxCall=insertUserTask',
			data: {
				uid : UID, 
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
		});;
    };

    Application.prototype.updateDBTaskComplete = function() {
      var elapsedTime, remainingTime, taskID;
      taskID = this.getActiveID();
      elapsedTime = this.getActiveElapsedTime();
      remainingTime = this.getActiveTime();
      console.log("Completing task");
      return $.ajax({
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
		});;
    };

    Application.prototype.initStackFromDB = function() {
      return $.ajax({
			url: 'scripts/functions.php?ajaxCall=getOpenTasks',
			dataType: 'json',
			data: {
				uid : UID, 
			},
			success: function(data){ 
				Application.prototype.parseStackData(data);
			},
			error: function(xhr,err) {
				console.log("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				console.log("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});;
    };

    Application.prototype.renderHistory = function() {
      return $.ajax({
			url: 'scripts/functions.php?ajaxCall=getHistory',
			dataType: 'json',
			data: {
				uid : UID, 
			},
			success: function(data){ 
				Application.prototype.unpackHistory(data);
			},
			error: function(xhr,err) {
				console.log("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				console.log("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});;
    };

    Application.prototype.renderStats = function() {
      this.outputAverageRatio();
      this.outputNumTasks();
      this.outputTotalTime();
      return this.outputAverageAccuracy();
    };

    Application.prototype.outputAverageRatio = function() {
      return $.ajax({
			url: 'scripts/functions.php?ajaxCall=getAverageRatio',
			data: {
				uid : UID, 
			},
			success: function(data){ 
				$("#stat-avg-ratio").html(data);
			},
			error: function(xhr,err) {
				console.log("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				console.log("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});;
    };

<<<<<<< Updated upstream
    Application.prototype.outputNumTasks = function() {
      return $.ajax({
			url: 'scripts/functions.php?ajaxCall=getNumTasksCompleted',
			data: {
				uid : UID, 
			},
			success: function(data){ 
				$("#stat-num-tasks").html(data);
			},
			error: function(xhr,err) {
				console.log("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				console.log("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});;
    };

    Application.prototype.outputTotalTime = function() {
      return $.ajax({
			url: 'scripts/functions.php?ajaxCall=getTotalTime',
			data: {
				uid : UID, 
			},
			success: function(data){ 
				$("#stat-total-time").html(data);
			},
			error: function(xhr,err) {
				console.log("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				console.log("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});;
    };

    Application.prototype.outputAverageAccuracy = function() {
      return $.ajax({
			url: 'scripts/functions.php?ajaxCall=getAveragePercentAccurarcy',
			data: {
				uid : UID, 
			},
			success: function(data){ 
				$("#stat-avg-accuracy").html(data);
			},
			error: function(xhr,err) {
				console.log("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				console.log("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});;
    };

=======
>>>>>>> Stashed changes
    Application.prototype.unpackHistory = function(data) {
      var tasks, _i, _len, _results;
      $("#history-list").html("");
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        tasks = data[_i];
        _results.push(this.outputHistory(tasks));
      }
      return _results;
    };

    Application.prototype.outputHistory = function(task) {
<<<<<<< Updated upstream
      var finalDate, historyEntry, magicRatio, prettyDate, weekday;
      prettyDate = new Date(task.dateTime);
      weekday = ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'];
      finalDate = weekday[prettyDate.getDay()];
      finalDate += " " + (prettyDate.getHours() % 12) + ":";
      if (prettyDate.getMinutes() < 10) finalDate += "0";
      finalDate += prettyDate.getMinutes();
      if (prettyDate.getHours() > 12) {
        finalDate += " PM";
      } else {
        finalDate += " AM";
      }
      magicRatio = (Math.round(task.ratio * 100)) / 100;
      historyEntry = "<li>";
      historyEntry += "<span class='history-date'>" + finalDate + "</span>" + task.taskName;
      historyEntry += "<span class='history-elapsed'>" + this.secondsToTimeString(parseInt(task.actualTime)) + "</span>";
      historyEntry += "<span class='history-slash'>/</span>";
      historyEntry += "<span class='history-target'>" + this.secondsToTimeString(parseInt(task.targetTime)) + "</span>";
      historyEntry += "<span class='history-ratio'>" + magicRatio + "</span>";
      historyEntry += "</li>";
      return $("#history-list").append(historyEntry);
=======
      return $("#below-the-fold").append("<li>" + task.taskName + "</li>");
>>>>>>> Stashed changes
    };

    Application.prototype.parseStackData = function(data) {
      var tasks, _i, _len;
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        tasks = data[_i];
        this.restoreTask(tasks);
      }
      if (data.length > 0) {
        this.showTaskActiveSlide();
        ACTIVE = true;
        return PAUSED = false;
      }
    };

    Application.prototype.restoreTask = function(task) {
      var thisTask;
      thisTask = [task.taskName, parseInt(task.remainingTime), parseInt(task.actualTime), parseInt(task.id), parseInt(task.targetTime)];
      console.log(thisTask);
      MASTER_STACK.push(thisTask);
      return this.renderList();
    };

    Application.prototype.pushTask = function(name, time) {
      var thisTask;
      console.log("Pushing new task to master array with: " + name + " for " + time + " minutes.");
      this.updateDBNewTask(name, time);
      thisTask = [name, time, 0, -1, time];
      MASTER_STACK.push(thisTask);
      return this.renderList();
    };

    Application.prototype.setActiveID = function(id) {
      return MASTER_STACK[MASTER_STACK.length - 1][3] = id;
    };

    Application.prototype.getActiveTask = function() {
      return MASTER_STACK[MASTER_STACK.length - 1];
    };

    Application.prototype.getActiveName = function() {
      var activeTask;
      activeTask = this.getActiveTask();
      return activeTask[0];
    };

    Application.prototype.getActiveTime = function() {
      var activeTask;
      activeTask = this.getActiveTask();
      return activeTask[1];
    };

    Application.prototype.getActiveElapsedTime = function() {
      var activeTask;
      activeTask = this.getActiveTask();
      return activeTask[2];
    };

    Application.prototype.getActiveID = function() {
      var activeTask;
      activeTask = this.getActiveTask();
      return activeTask[3];
    };

<<<<<<< Updated upstream
    Application.prototype.getGoalTime = function() {
      var activeTask;
      activeTask = this.getActiveTask();
      return activeTask[4];
    };

=======
>>>>>>> Stashed changes
    Application.prototype.setActiveTime = function(x) {
      return MASTER_STACK[MASTER_STACK.length - 1][1] = x;
    };

    Application.prototype.secondsToTimeString = function(x) {
      var minutes, seconds;
      minutes = Math.floor(x / 60);
      seconds = x % 60;
      if (seconds < 10) seconds = "0" + seconds;
      return minutes + ":" + seconds;
    };

    Application.prototype.incrementActiveElapsedTime = function(x) {
      return MASTER_STACK[MASTER_STACK.length - 1][2] += x;
    };

    Application.prototype.taskComplete = function() {
      this.updateDBTaskComplete();
      MASTER_STACK.pop();
      this.renderList();
      this.renderStats();
      this.renderHistory();
      if (MASTER_STACK.length > 0) {
        if (this.getActiveTime() === 0) {
          PAUSED = true;
          return this.showTaskTimeSlide();
        } else {
          PAUSED = false;
          return this.showTaskActiveSlide();
        }
      } else {
        this.showTaskNameSlide();
        return ACTIVE = false;
      }
    };

    Application.prototype.primeButtons = function() {
      var _this = this;
      $(".set-time-button").click(function() {
        return _this.showTaskTimeSlide();
      });
      $(".set-name-button").click(function() {
        if (ACTIVE === false) return _this.showTaskNameSlide();
      });
      $(".time-plus-button").mousedown(function() {
        return _this.incrementDisplayTime();
      });
      $(".time-minus-button").mousedown(function() {
        return _this.decrementDisplayTime();
      });
      $("#time-muncher").click(function() {
        var taskName, taskTime;
        if (ACTIVE === true) {
          console.log("Updating active task");
          taskTime = $("#time-muncher").html() * 60;
          _this.incrementActiveTime(taskTime);
          PAUSED = false;
          _this.renderList();
          return _this.showTaskActiveSlide();
        } else {
          console.log("Creating new task");
          taskName = $("#thedoing").val();
          taskTime = $("#time-muncher").html() * 60;
          _this.pushTask(taskName, taskTime);
          $("#thedoing").val("");
          DISPLAY_TIME = 10;
          _this.renderList();
          _this.showTaskActiveSlide();
          ACTIVE = true;
          return PAUSED = false;
        }
      });
      $(".minute-plus-button").click(function() {
        if (MASTER_STACK.length > 0) {
          _this.incrementActiveTime(60);
          return _this.renderList();
        }
      });
      $(".add-time-button").click(function() {
<<<<<<< Updated upstream
        _this.hideOverlay();
=======
>>>>>>> Stashed changes
        DISPLAY_TIME = 10;
        return _this.showTaskTimeSlide();
      });
      $(".replace-task-button").click(function() {
<<<<<<< Updated upstream
        _this.hideOverlay();
=======
>>>>>>> Stashed changes
        ACTIVE = false;
        PAUSED = true;
        return _this.showTaskInProgNameSlide();
      });
      return $(".complete-task-button").click(function() {
<<<<<<< Updated upstream
        _this.hideOverlay();
=======
>>>>>>> Stashed changes
        return _this.taskComplete();
      });
    };

<<<<<<< Updated upstream
    Application.prototype.deployOverlay = function() {
      $("#overlay").fadeIn();
      return $("#overlay h1").html(this.getActiveName());
    };

    Application.prototype.hideOverlay = function() {
      return $("#overlay").fadeOut();
    };

=======
>>>>>>> Stashed changes
    Application.prototype.incrementDisplayTime = function() {
      DISPLAY_TIME++;
      return $("#time-muncher").html(DISPLAY_TIME);
    };

    Application.prototype.decrementDisplayTime = function() {
      DISPLAY_TIME--;
      return $("#time-muncher").html(DISPLAY_TIME);
    };

<<<<<<< Updated upstream
    Application.prototype.randomizePrompt = function() {
      var theword;
      theword = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
      return $("#prompt").html(theword);
    };

=======
>>>>>>> Stashed changes
    Application.prototype.showTaskNameSlide = function() {
      this.randomizePrompt();
      return $("#slide-holder").animate({
        left: "0"
      }, 500, "easeInQuad");
    };

    Application.prototype.showTaskInProgNameSlide = function() {
      $("#prompt").html("Now what will you do?");
      return $("#slide-holder").animate({
        left: "0"
      }, 500, "easeInQuad");
    };

    Application.prototype.showTaskTimeSlide = function() {
      var name;
      $("#time-muncher").html(DISPLAY_TIME);
      if ($("#thedoing").val()) {
        $("#prompt").html(($("#thedoing").val()) + "? ok.");
        $("#time-comment").html("How long will that take?");
        $("#change-intention").fadeIn();
      } else {
        name = this.getActiveName();
        $("#prompt").html("Time to " + name);
        $("#time-comment").html("How much longer do you need?");
        $("#change-intention").fadeOut();
      }
      return $("#slide-holder").animate({
        left: "-700"
      }, 500, "easeInQuad");
    };

    Application.prototype.showTaskActiveSlide = function() {
      var name;
      name = this.getActiveName();
      $("#prompt").html("go " + name + "!");
      return $("#slide-holder").animate({
        left: "-1400"
      }, 500, "easeInQuad");
    };

<<<<<<< Updated upstream
=======
    Application.prototype.showTaskExpiredSlide = function() {
      return $("#slide-holder").animate({
        left: "-2100"
      }, 500, "easeInQuad");
    };

>>>>>>> Stashed changes
    Application.prototype.renderList = function() {
      var i, task, _ref, _results;
      if (MASTER_STACK.length > 0) {
        task = this.getActiveTask();
        $("#time-remaining").html(this.secondsToTimeString(task[1]));
        $("#elapsed-time").html(this.secondsToTimeString(task[2]));
        $("#original-target").html(this.secondsToTimeString(task[4]));
        $("#task-list").html("");
      }
      if (MASTER_STACK.length > 1) {
        $("#pending-tasks").fadeIn();
        _results = [];
        for (i = _ref = MASTER_STACK.length - 2; _ref <= 0 ? i <= 0 : i >= 0; _ref <= 0 ? i++ : i--) {
          _results.push(this.renderTask(MASTER_STACK[i]));
        }
        return _results;
      } else {
        return $("#pending-tasks").fadeOut();
      }
    };

    Application.prototype.renderTask = function(task) {
      var opacity;
      $("#task-list").append("<li>" + task[0] + "</li>");
      opacity = 1.0;
      return $("#task-list").children().each(function() {
        $(this).css("opacity", opacity);
        opacity -= 0.15;
        return opacity = Math.max(0, opacity);
      });
    };

    return Application;

  })();

  $(function() {
    return new Application;
  });

}).call(this);
