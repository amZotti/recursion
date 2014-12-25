// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var stringifyJSONarray = function(arr) {
    var result = [];
    for (var i = 0;i < arr.length;i++) {
      result.push(stringifyJSON(arr[i]));
    }
    return arrayToString(result);
  };

  var arrayToString = function(arr) {
    var str = arr.join(",");
    var size = str.length;
    return "[" + str.substring(0, size) + "]";
  }

  var objectToString = function(arr) {
    console.log(arr);
    var str = arr.join(",");
    console.log(str);
    var size = str.length;
    return "{" + str.substring(0, size) + "}";
  }

  var stringifyJSONobject = function(obj) {
    var result = [];
    for (var key in obj) {
      if (!(typeof obj[key] === "function" || obj[key] === undefined))
        result.push(stringifyJSON(key) + ":" + stringifyJSON(obj[key]));

    }
    return objectToString(result);
  };

  var stringifyJSONnumber = function(num) {
    return String(num);
  };

  if (obj instanceof Array && obj.length === 0) {
    return "[]";
  }
  else if (typeof obj === "function" || obj === undefined) {
    return undefined;
  }
  else if (obj instanceof Array && obj.length !== 0) {
    return "[" + stringifyJSONarray(obj).slice(1);
  }
  else if(typeof(obj) === "number") {
    return stringifyJSONnumber(obj);
  }
  else if (obj instanceof Object) {
    return stringifyJSONobject(obj);
  }
  else if (obj === null) {
    return "null";
  }
  else if (obj === true) {
    return "true";
  }
  else if (obj === false) {
    return "false";
  }
  else if (typeof obj === "string") {
    return '"' + obj + '"';
  }
}
