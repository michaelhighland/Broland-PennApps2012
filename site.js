(function() {
  var randomInRange;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  randomInRange = function(x, y) {
    return Math.floor(Math.random() * x) + y;
  };
  window.Application = (function() {
    var MASTER_STACK;
    MASTER_STACK = new Array();
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
          return alert("Time is Up!");
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
        taskTime = $("#thetime").val();
        this.pushTask(taskName, taskTime);
        $("#thedoing").val("");
        $("#thetime").val("");
        return this.renderList();
      }, this));
      $("#donebutton").click(__bind(function() {
        MASTER_STACK.pop();
        return this.renderList();
      }, this));
      return $("#moretimebutton").click(__bind(function() {
        if (MASTER_STACK.length > 0) {
          this.incrementActiveTime(5);
          return this.renderList();
        }
      }, this));
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
