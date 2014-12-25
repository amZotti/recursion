// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var stringifyJSONarray = function(arr) {
    var result = [];
    for (var i = 0;i < arr.length;i++) {
      result.push(stringifyJSON(arr[i]));
    }
    return "[" + result.join(",") + "]";
  };

  var stringifyJSONobject = function(obj) {
    var result = [];
    for (var key in obj) {
      if (!(typeof obj[key] === "function" || obj[key] === undefined))
        result.push(stringifyJSON(key) + ":" + stringifyJSON(obj[key]));
    }
    return "{" + result.join(",") + "}";
  };

  if (obj instanceof Array && obj.length === 0)
    return "[]";

  else if (obj instanceof Array && obj.length !== 0)
    return "[" + stringifyJSONarray(obj).slice(1);

  else if (obj instanceof Object)
    return stringifyJSONobject(obj);

  else if (typeof obj === "string")
    return '"' + obj + '"';

  else
    return String(obj);
}
