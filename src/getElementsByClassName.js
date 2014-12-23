// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

var getElementsByClassName = function(klass) {
  var className = klass;
  var classElements = [];
  var getElementsByClassNameHelper = function(root){

    var classNames = root.className.split(" ");
    for (var i = 0;i < classNames.length;i++) {
      if (classNames[i] === className)
        classElements.push(root);
    }

    var children = root.children;
    if (children !== undefined) {
      for (i = 0;i < children.length;i++)
        getElementsByClassNameHelper(children[i]);
    }
  };
  getElementsByClassNameHelper(document.body);
  return classElements;
};
