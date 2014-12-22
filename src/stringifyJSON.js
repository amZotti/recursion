// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var stringifyJSONarray = function(arr) {
    if (arr.length <= 0)
      return "]";
    var currentElement = ", " + arr[0];
    var result =  stringifyJSONarray(arr.slice(1));
    return currentElement + result;
  };

  var stringifyJSONobject = function(obj) {
    return null;
  };

  var stringifyJSONnumber = function(num) {
    if (num == 0)
      return "";
    var currentElement = String(num % 10);
    var result = stringifyJSONnumber(Math.floor(num / 10));
    return currentElement + result;
  };



  if (obj instanceof Array) {
    return "[" + stringifyJSONarray(obj).slice(2);
  }
  else if(typeof(obj) === "number") {
    return stringifyJSONnumber(obj);
  }
  else if (obj instanceof Object) {
    return stringifyJSONobject(obj);
  }
}
