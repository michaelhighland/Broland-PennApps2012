(function() {
  var randomInRange;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  randomInRange = function(x, y) {
    return Math.floor(Math.random() * x) + y;
  };
  window.Application = (function() {
    var DISPLAY_TIME, MASTER_STACK;
    MASTER_STACK = new Array();
    DISPLAY_TIME = 5;
    function Application() {
      this.init();
      this.hookUp();
    }
    Application.prototype.init = function() {
      var interval;
      console.log("Initializaed Intention 1.0");
      return interval = setInterval("Application.prototype.tick()", 1000);
    };
    Application.prototype.pushTask = function(name, time) {
      var thisTask;
      console.log("Pushing new task to master array with: " + name + " for " + time + " minutes.");
      thisTask = [name, time];
      MASTER_STACK.push(thisTask);
      return this.renderList();
    };
    Application.prototype.tick = function() {
      var activeTime;
      if (MASTER_STACK.length > 0) {
        activeTime = this.incrementActiveTime(-1);
        this.renderList();
        if (activeTime === 0) {
          alert("Time is Up!");
          return this.showTaskTimeUpSlide();
        }
      }
    };
    Application.prototype.incrementActiveTime = function(x) {
      var activeTask, activeTime;
      console.log("incrementing active time by " + x);
      if (MASTER_STACK.length > 0) {
        activeTask = MASTER_STACK[MASTER_STACK.length - 1];
        activeTime = activeTask[1];
        activeTime = (parseInt(activeTime)) + (parseInt(x));
        MASTER_STACK[MASTER_STACK.length - 1][1] = activeTime;
        return activeTime;
      }
    };
    Application.prototype.hookUp = function() {
      $("#gobutton").click(__bind(function() {
        var taskName, taskTime;
        taskName = $("#thedoing").val();
        taskTime = $("#time-muncher").html();
        this.pushTask(taskName, taskTime);
        $("#thedoing").val("");
        this.renderList();
        return this.showTaskActiveSlide(taskName);
      }, this));
      $(".donebutton").click(__bind(function() {
        var activeName, activeTask;
        MASTER_STACK.pop();
        this.renderList();
        if (MASTER_STACK.length > 0) {
          activeTask = MASTER_STACK[MASTER_STACK.length - 1];
          activeName = activeTask[0];
          return this.showTaskActiveSlide(activeName);
        } else {
          return this.showTaskNameSlide();
        }
      }, this));
      $(".moretimebutton").click(__bind(function() {
        if (MASTER_STACK.length > 0) {
          this.incrementActiveTime(5);
          return this.renderList();
        }
      }, this));
      $(".time-slide").click(__bind(function() {
        return this.showTaskTimeSlide();
      }, this));
      $(".task-slide").click(__bind(function() {
        return this.showTaskNameSlide();
      }, this));
      $(".time-plus").mousedown(__bind(function() {
        return this.incrementDisplayTime();
      }, this));
      return $(".time-minus").mousedown(__bind(function() {
        return this.decrementDisplayTime();
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
    Application.prototype.showTaskTimeSlide = function() {
      $("#time-muncher").html(DISPLAY_TIME);
      $("#prompt").html("How long should that take?");
      return $("#slide-holder").animate({
        left: "-600"
      }, 500, "easeInQuad");
    };
    Application.prototype.showTaskActiveSlide = function(name) {
      $("#prompt").html(name);
      return $("#slide-holder").animate({
        left: "-1200"
      }, 500, "easeInQuad");
    };
    Application.prototype.showTaskTimeUpSlide = function() {
      return $("#slide-holder").animate({
        left: "-1800"
      }, 500, "easeInQuad");
    };
    Application.prototype.renderList = function() {
      var i, _ref, _results;
      $("#task-list").html("");
      if (MASTER_STACK.length > 0) {
        _results = [];
        for (i = _ref = MASTER_STACK.length - 1; _ref <= 0 ? i <= 0 : i >= 0; _ref <= 0 ? i++ : i--) {
          _results.push(this.renderTask(MASTER_STACK[i]));
        }
        return _results;
      }
    };
    Application.prototype.renderTask = function(task) {
      return $("#task-list").append("<div>Name: " + task[0] + "- Time: " + task[1] + "<br/></div>");
    };
    return Application;
  })();
  $(function() {
    return new Application;
  });
}).call(this);
