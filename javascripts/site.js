(function() {
  var randomInRange;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  randomInRange = function(x, y) {
    return Math.floor(Math.random() * x) + y;
  };
  window.Application = (function() {
    var ACTIVE, DISPLAY_TIME, EXCLAMATIONS, FOOTER_OVERLAP, MASTER_STACK, NEW_TASK, PAUSED;
    MASTER_STACK = new Array();
    DISPLAY_TIME = 10;
    FOOTER_OVERLAP = 50;
    PAUSED = false;
    ACTIVE = false;
    NEW_TASK = null;
    EXCLAMATIONS = ["Huzzah!", "Gadzooks!", "Sweet Baby Jesus!", "Time Flies!"];
    function Application() {
      this.init();
      this.primeButtons();
      this.primeFoldSize();
    }
    Application.prototype.init = function() {
      var interval;
      console.log("Initializaed Intention 1.0");
      return interval = setInterval("Application.prototype.tick()", 1000);
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
          if (this.getActiveTime() === 0) {
            PAUSED = true;
            theword = EXCLAMATIONS[Math.floor(Math.random() * EXCLAMATIONS.length)];
            alert(theword + " It's time to check in.");
            this.showTaskExpiredSlide();
          }
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
    Application.prototype.pushTask = function(name, time) {
      var thisTask;
      console.log("Pushing new task to master array with: " + name + " for " + time + " minutes.");
      thisTask = [name, time, 0];
      MASTER_STACK.push(thisTask);
      return this.renderList();
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
    Application.prototype.setActiveTime = function(x) {
      return MASTER_STACK[MASTER_STACK.length - 1][1] = x;
    };
    Application.prototype.incrementActiveElapsedTime = function(x) {
      return MASTER_STACK[MASTER_STACK.length - 1][2] += x;
    };
    Application.prototype.taskComplete = function() {
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
      $("#create-task-button").click(__bind(function() {
        var taskName, taskTime;
        if (ACTIVE === true) {
          console.log("Updating active task");
          taskTime = $("#time-muncher").html();
          this.incrementActiveTime(taskTime);
          PAUSED = false;
          this.renderList();
          return this.showTaskActiveSlide();
        } else {
          console.log("Creating new task");
          taskName = $("#thedoing").val();
          taskTime = $("#time-muncher").html();
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
          this.incrementActiveTime(1);
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
        left: "-600"
      }, 500, "easeInQuad");
    };
    Application.prototype.showTaskActiveSlide = function() {
      var name;
      name = this.getActiveName();
      $("#prompt").html("go " + name + "!");
      return $("#slide-holder").animate({
        left: "-1200"
      }, 500, "easeInQuad");
    };
    Application.prototype.showTaskExpiredSlide = function() {
      return $("#slide-holder").animate({
        left: "-1800"
      }, 500, "easeInQuad");
    };
    Application.prototype.renderList = function() {
      var i, task, _ref, _results;
      if (MASTER_STACK.length > 0) {
        task = this.getActiveTask();
        $("#status").html("Time Left: " + task[1] + " Elapsed: " + task[2]);
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
