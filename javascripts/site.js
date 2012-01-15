(function() {
  var randomInRange;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  randomInRange = function(x, y) {
    return Math.floor(Math.random() * x) + y;
  };
  window.Application = (function() {
    var ACTIVE, BACKUP_RATE, DISPLAY_TIME, EXCLAMATIONS, FOOTER_OVERLAP, MASTER_STACK, NEW_TASK, PAUSED, SPEED_SCALE;
    MASTER_STACK = new Array();
    DISPLAY_TIME = 10;
    FOOTER_OVERLAP = 50;
    PAUSED = false;
    ACTIVE = false;
    NEW_TASK = null;
    BACKUP_RATE = 30;
    SPEED_SCALE = 30;
    EXCLAMATIONS = ["Huzzah!", "Gadzooks!", "Sweet Baby Jesus!", "Time Flies!", "Cracking!"];
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
      this.initStackFromDB();
      return this.renderHistory();
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
              this.showTaskExpiredSlide();
            }
          }
        }
        if (this.getActiveElapsedTime() % BACKUP_RATE === 0) {
          this.updateDBTime();
        }
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
				alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				alert("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});;
    };
    Application.prototype.updateDBNewTask = function(name, time) {
      return $.ajax({
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
				alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				alert("responseText: "+xhr.responseText);
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
				alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				alert("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});;
    };
    Application.prototype.initStackFromDB = function() {
      return $.ajax({
			url: 'scripts/functions.php?ajaxCall=getOpenTasks',
			dataType: 'json',
			data: {
				uid : 33333, 
			},
			success: function(data){ 
				Application.prototype.parseStackData(data);
			},
			error: function(xhr,err) {
				alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				alert("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});;
    };
    Application.prototype.renderHistory = function() {
      return $.ajax({
			url: 'scripts/functions.php?ajaxCall=getHistory',
			dataType: 'json',
			data: {
				uid : 33333, 
			},
			success: function(data){ 
				Application.prototype.unpackHistory(data);
			},
			error: function(xhr,err) {
				alert("readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
				alert("responseText: "+xhr.responseText);
			},
			type: 'POST'
		});;
    };
    Application.prototype.unpackHistory = function(data) {
      var tasks, _i, _len, _results;
      $("#below-the-fold").html("");
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        tasks = data[_i];
        _results.push(this.outputHistory(tasks));
      }
      return _results;
    };
    Application.prototype.outputHistory = function(task) {
      return $("#below-the-fold").append("<li>" + task.taskName + "</li>");
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
      thisTask = [task.taskName, parseInt(task.remainingTime), parseInt(task.actualTime), parseInt(task.id)];
      console.log(thisTask);
      MASTER_STACK.push(thisTask);
      return this.renderList();
    };
    Application.prototype.pushTask = function(name, time) {
      var thisTask;
      console.log("Pushing new task to master array with: " + name + " for " + time + " minutes.");
      this.updateDBNewTask(name, time);
      thisTask = [name, time, 0, -1];
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
    Application.prototype.setActiveTime = function(x) {
      return MASTER_STACK[MASTER_STACK.length - 1][1] = x;
    };
    Application.prototype.secondsToTimeString = function(x) {
      var minutes, seconds;
      minutes = Math.floor(x / 60);
      seconds = x % 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    };
    Application.prototype.incrementActiveElapsedTime = function(x) {
      return MASTER_STACK[MASTER_STACK.length - 1][2] += x;
    };
    Application.prototype.taskComplete = function() {
      this.updateDBTaskComplete();
      MASTER_STACK.pop();
      this.renderList();
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
      $(".set-time-button").click(__bind(function() {
        return this.showTaskTimeSlide();
      }, this));
      $(".set-name-button").click(__bind(function() {
        if (ACTIVE === false) {
          return this.showTaskNameSlide();
        }
      }, this));
      $(".time-plus-button").mousedown(__bind(function() {
        return this.incrementDisplayTime();
      }, this));
      $(".time-minus-button").mousedown(__bind(function() {
        return this.decrementDisplayTime();
      }, this));
      $("#time-muncher").click(__bind(function() {
        var taskName, taskTime;
        if (ACTIVE === true) {
          console.log("Updating active task");
          taskTime = $("#time-muncher").html() * 60;
          this.incrementActiveTime(taskTime);
          PAUSED = false;
          this.renderList();
          return this.showTaskActiveSlide();
        } else {
          console.log("Creating new task");
          taskName = $("#thedoing").val();
          taskTime = $("#time-muncher").html() * 60;
          this.pushTask(taskName, taskTime);
          $("#thedoing").val("");
          DISPLAY_TIME = 10;
          this.renderList();
          this.showTaskActiveSlide();
          ACTIVE = true;
          return PAUSED = false;
        }
      }, this));
      $(".minute-plus-button").click(__bind(function() {
        if (MASTER_STACK.length > 0) {
          this.incrementActiveTime(60);
          return this.renderList();
        }
      }, this));
      $(".add-time-button").click(__bind(function() {
        DISPLAY_TIME = 10;
        return this.showTaskTimeSlide();
      }, this));
      $(".replace-task-button").click(__bind(function() {
        ACTIVE = false;
        PAUSED = true;
        return this.showTaskInProgNameSlide();
      }, this));
      return $(".complete-task-button").click(__bind(function() {
        return this.taskComplete();
      }, this));
    };
    Application.prototype.incrementDisplayTime = function() {
      DISPLAY_TIME++;
      return $("#time-muncher").html(DISPLAY_TIME);
    };
    Application.prototype.decrementDisplayTime = function() {
      DISPLAY_TIME--;
      return $("#time-muncher").html(DISPLAY_TIME);
    };
    Application.prototype.showTaskNameSlide = function() {
      $("#prompt").html("What will you do now?");
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
      } else {
        name = this.getActiveName();
        $("#prompt").html("Time to " + name);
        $("#time-comment").html("How much longer do you need?");
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
    Application.prototype.showTaskExpiredSlide = function() {
      return $("#slide-holder").animate({
        left: "-2100"
      }, 500, "easeInQuad");
    };
    Application.prototype.renderList = function() {
      var i, task, _ref, _results;
      if (MASTER_STACK.length > 0) {
        task = this.getActiveTask();
        $("#status").html("Time Left: " + (this.secondsToTimeString(task[1])) + " Elapsed: " + (this.secondsToTimeString(task[2])) + " ID:" + task[3]);
        $("#task-list").html("");
      }
      if (MASTER_STACK.length > 1) {
        _results = [];
        for (i = _ref = MASTER_STACK.length - 2; _ref <= 0 ? i <= 0 : i >= 0; _ref <= 0 ? i++ : i--) {
          _results.push(this.renderTask(MASTER_STACK[i]));
        }
        return _results;
      }
    };
    Application.prototype.renderTask = function(task) {
      var opacity;
      $("#task-list").append("<div>" + task[0] + "</div>");
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
