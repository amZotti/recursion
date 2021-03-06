// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

function nextValue() {
  currentValue = source.charAt(index);
  index++;
  if (index > (source.length) && currentValue === "")
    throw SyntaxError();
  if (currentValue === "")
    return undefined;
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
    if (endOfArray)
      break;
    findNextArrayValue();
  }
  endOfArray = false;
   if (index > source.length)
     throw SyntaxError();
  return arr;
}

function findNextArrayValue() {
  removeWhiteSpace();
  if (currentValue === ",") {
    nextValue();
  }
  removeWhiteSpace();
}

function findNextObjectValue() {
  removeWhiteSpace();
  if (currentValue === "}" || currentValue === "")
    endOfObject = true;
  if (currentValue === ":" || currentValue === ",")
    nextValue();
  while(/[\t\n\r]/.test(currentValue)) {
    nextValue();
  }
  if (currentValue === "}" || currentValue === "")
    endOfObject = true;
  removeWhiteSpace();
}

function parseObject() {
  var obj = {}, key, value;
  nextValue();
  while (currentValue !== "}" && currentValue !== "") {
    findNextObjectValue();
    findNextObjectValue();
    if (!endOfObject) {
      key = parseString(currentValue);
      nextValue();
      findNextObjectValue();
      findNextObjectValue();
      value = processNextValue(currentValue);
      obj[key] = value;
      nextValue();
    }
    else  {
      endOfObject = false;
      break;
    }
  }
  return obj;
}

function parseNumber() {
  var str = "";
  while (/[0-9\.-]/.test(currentValue)) {
    str += currentValue;
    nextValue();
  }
  if (currentValue === "]")
    endOfArray = true;
  if (currentValue === "}")
    endOfObject = true;
  if (/\./.test(str)) {
    index--;
    return parseFloat(str);
  }
  else
    return parseInt(str);
}


function parseString() {
  var str = "";
  if (currentValue === "'" || currentValue === '"')
    nextValue();
  while (!/["]/.test(currentValue)) {
    if (currentValue === "\\") {
      nextValue();
      str += parseSpecialCharacter();
    }
    else {
      str += currentValue;
    }
  nextValue();
}
return str;
}

function parseSpecialCharacter() {
  switch(currentValue) {
    case ("t"):
      return "\t";
    case ("n"):
      return "\n";
    case ("\\"):
      return "\\";
    case ("/"):
      return "/";
    case ("b"):
      return "\b";
    case ("r"):
      return "\r";
    case ("f"):
      return "\f";
    case ('"'):
      return '"';
    default:
      return currentValue;
  }
}

function parseContent() {
  switch (currentValue) {
    case ("u"):
      index += 8;
      return undefined;
    case ("n"):
      index += 3;
      return null;
    case ("t"):
      index += 3;
      return true;
    case ("f"):
      index += 4;
      return false;
    default:
      //Syntax error
      return undefined;
  }
}

function processNextValue() {
  removeWhiteSpace();
  switch (true) {
    case /\[/.test(currentValue):
      return parseArray();
    case /{/.test(currentValue):
      return parseObject();
      case /["]/.test(currentValue):
      return parseString();
      case /[0-9\.-]/.test(currentValue):
      return parseNumber();
      default:
      return parseContent();
    }
  }

  function parseJSON(json) {
    endOfArray = false;
    endOfObject = false;
    source = json;
    index = 0;
    currentValue = "";
    nextValue();
    return processNextValue();
  }
