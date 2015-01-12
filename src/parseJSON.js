// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

var removeWhiteSpace = function() {
  while (currentValue === " ")
    nextValue();
}

var parseArray = function() {
  //incomplete
}

var parseObject = function() {
  //incomplete
}

var parseString = function() {
  //incomplete
}

var parseContent = function() {
  //incomplete
}

var nextValue = function() {
  currentValue = source.charAt(index);
  index++;
  if (currentValue === "")
    console.log("Nothing left to process");
}

var processNextValue = function() {
  removeWhiteSpace();
  switch (currentValue) {
    case "[":
      return parseArray();
    case "{":
      return parseObject();
    case '"':
      return parseString();
    default:
      return parseContent();
  }
}

var parseJSON = function(json) {
  source = json;
  index = 0;
  currentValue = "";
  nextValue();
  processNextValue();
}

console.log(parseJSON("[1,2,3,4]"));
