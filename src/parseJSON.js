// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var findIndexOfNextThing = function(json) {
  var obj = {};
  for (var i = 0;i < json.length;i++) {
    var currentValue = json[i];
    switch(true) {
      case(currentValue == "]"):
        obj['type'] = "end array";
        break;
      case(currentValue == "["):
        obj['type'] = "new array";
        break;
      case(/[a-z]/i.test(currentValue)):
        obj['type'] = "content"
        break;
      case(/[0-9]/.test(currentValue)):
        if (isString(json, i))
          obj['value'] = String(currentValue);
        else
          obj['value'] = parseInt(currentValue);
        obj['type'] = "content"
        break;
    }
    obj['value'] = obj['value'] || currentValue;
    obj['index'] = i;
    if (obj['type'])
      return obj;
  }
};

var isString = function(json, i) {
  return json[i-1] === "'" || json[i-1] === '"' || 
    json[i+1] === "'" || json[i+1] === '"';
};

var parseJSON = function(json) {
  var currentChar = json.charAt(0);
  if (currentChar === "[")
    return [parseJSON(json.substring(1))];
  if (currentChar.match(/[a-z0-9]/i))
    var result = parseJSON(json.substring(2));
  return currentChar + ", " + result;
}

console.log(findIndexOfNextThing(']'));

//console.log(parseJSON("[1,2,3]"));
