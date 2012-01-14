(function() {
  var randomInRange;
  randomInRange = function(x, y) {
    return Math.floor(Math.random() * x) + y;
  };
  window.Application = (function() {
    var GLOBAL_VAR;
    GLOBAL_VAR = 1000;
    function Application() {
      this.init();
    }
    Application.prototype.init = function() {
      return alert("hello world");
    };
    return Application;
  })();
  $(function() {
    return new Application;
  });
}).call(this);
