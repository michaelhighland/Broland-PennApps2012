(function() {
  var randomInRange;
  randomInRange = function(x, y) {
    return Math.floor(Math.random() * x) + y;
  };
  window.Application = (function() {
    var GLOBAL_VAR, MASTER_STACK;
    GLOBAL_VAR = 1000;
    MASTER_STACK = new Array();
    function Application() {
      this.init();
      this.hookupButtons();
    }
    Application.prototype.init = function() {
      return console.log("Initializaed Intention 1.0");
    };
    Application.prototype.pushTask = function(name, time) {
      var thisTask;
      console.log("Pushing new task to master array");
      thisTask = [name, time];
      return MASTER_STACK.push(thisTask);
    };
    return Application;
  })();
  $(function() {
    return new Application;
  });
}).call(this);
