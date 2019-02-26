function yn() { }

yn._version = 0.1;

yn.throttle = function (fn, wait) {
  var timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => { timer = null }, wait);
      return fn.apply(this, args);
    }
  }
}