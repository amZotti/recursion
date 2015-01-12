// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

function nextValue() {
  currentValue = source.charAt(index);
  index++;
  if (currentValue === "")
    console.log("Nothing left to process");
}

function removeWhiteSpace() {
  while (currentValue === " ")
    nextValue();
}

function parseArray() {
  var arr = [];
  nextValue();
  while (currentValue !== "]" && currentValue !== "") {
    arr.push(processNextValue(currentValue));
    nextValue();
    findNextArrayValue();
  }
  return arr;
}

function findNextArrayValue() {
  removeWhiteSpace();
  if (currentValue === ",") {
    nextValue();
  }
  removeWhiteSpace();
}

function parseObject() {
  //incomplete
}

function parseString() {
  //incomplete
}

function parseContent() {
  if (/[0-9]/.test(currentValue))
    return parseNumber();
  else
    return parseWord();
}

function parseNumber() {
  var str = "";
  while (/[0-9]/.test(currentValue)) {
    str += currentValue;
    nextValue();
  }
  return parseInt(str);
}

function processNextValue() {
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

function parseJSON(json) {
  source = json;
  index = 0;
  currentValue = "";
  nextValue();
  return processNextValue();
}

console.log(parseJSON("[111,2,3,4]"));
