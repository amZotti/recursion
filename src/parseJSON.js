// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var delimiterStack = [];
  var result = [];
  var parseJSONhelper = function(json) {
    var valueStack = [];
    for (var i = 0;i < json.length;i++) {
      if (json[i] === "[")
        delimiterStack.push("[");
      else if (json[i] === "]") {
        delimiterStack.pop();
        copyStackOver(valueStack);
        valueStack = [];
      }
      else if (json[i] === ",");
        //ignore
      else {
        valueStack.push(json[i]);
      }
    };
  };

  var copyStackOver = function(valueStack) {
    for (var i = 0;i < valueStack.length;i++) {
      result.push(valueStack[i]);
    }
  };

  parseJSONhelper(json);
  return result;
}
