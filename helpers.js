var isIdentifierNameES6 = require('esutils').keyword.isIdentifierNameES6;

function cleanChildren(child) {
  var lines = child.value.split(/\r\n|\n|\r/);
  var lastNonEmptyLine = 0;

  for (var i = 0; i < lines.length; i++) {
    if (lines[i].match(/[^ \t]/)) {
      lastNonEmptyLine = i;
    }
  }

  var str = '';

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    var isFirstLine = i === 0;
    var isLastLine = i === lines.length - 1;
    var isLastNonEmptyLine = i === lastNonEmptyLine;

    // replace rendered whitespace tabs with spaces
    var trimmedLine = line.replace(/\t/g, ' ');

    // trim whitespace touching a newline
    if (!isFirstLine) {
      trimmedLine = trimmedLine.replace(/^[ ]+/, '');
    }

    // trim whitespace touching an endline
    if (!isLastLine) {
      trimmedLine = trimmedLine.replace(/[ ]+$/, '');
    }

    if (trimmedLine) {
      if (!isLastNonEmptyLine) {
        trimmedLine += ' ';
      }

      str += trimmedLine;
    }
  }

  return str;
}

function buildChildren(children, t) {
  var elems = [];

  for (var i = 0; i < children.length; i++) {
    var child = children[i];

    if (t.isLiteral(child) && typeof child.value === 'string') {
      var str = cleanChildren(child, t);
      if (str) elems.push(t.literal(str));

      continue;
    }

    elems.push(child);
  }

  return elems;
}

function handleProps(props, scope, file, t) {
  // scope.push({ id: t.identifier("id"), init: t.identifier("init") });
  props = props.map(function(prop) {
    var propName = prop.key.name || prop.key.value;

    if (isIdentifierNameES6(propName)) {
      propName = t.identifier(propName);
    } else {
      propName = t.literal(propName);
    }

    return t.property('init', propName, prop.value);
  });

  return t.objectExpression(props);
}

function handleSpreadProps(props, scope, file, t) {
  var propsStack = [];
  var objectsStack = [];

  var pushProps = function () {
    if (!propsStack.length) return;

    objectsStack.push(t.objectExpression(propsStack));
    propsStack = [];
  };

  var makeProp = function(prop) {
    var propName = prop.key.name || prop.key.value;

    if (isIdentifierNameES6(propName)) {
      propName = t.identifier(propName);
    } else {
      propName = t.literal(propName);
    }

    return t.property('init', propName, prop.value);
  };

  for (var i = 0, len = props.length; i < len; i++) {
    var prop = props[i];

    if (t.isJSXSpreadAttribute(prop)) {
      pushProps();
      objectsStack.push(prop.argument);
    } else {
      propsStack.push(makeProp(prop));
    }
  }

  pushProps();

  if (objectsStack.length === 1) {
    // only one object
    props = objectsStack[0];
  } else {
    // looks like we have multiple objects
    if (!t.isObjectExpression(objectsStack[0])) {
      objectsStack.unshift(t.objectExpression([]));
    }

    // spread it
    props = t.callExpression(
      file.addHelper('extends'),
      objectsStack
    );

    /*var propsKey = scope.generateUidIdentifier('props');

    scope.push({
      id: propsKey,
      init: props
    });

    props = t.identifier(propsKey.name);*/
  }

  return props;
}

function checkBuiltins(builtins, tag) {
  if (!builtins) return false;

  if (builtins instanceof RegExp) {
    return builtins.test(tag);
  }

  if (Array.isArray(builtins)) {
    var match = false;

    for (var i = 0, len = builtins.length; i < len; i++) {
      var check = builtins[i];

      if (typeof check === 'string') {
        match = check === tag;
      } else if (check instanceof RegExp) {
        match = check.test(tag);
      }

      if (match) return true;
    }
  }

  return false;
}

function readMemberExpression(node, t) {
  var tag = [];

  do {
    tag.push(node.property.name);
  } while (t.isMemberExpression(node = node.object));

  tag.push(node.name);

  return tag.reverse();
}

module.exports = {
  cleanChildren: cleanChildren,
  buildChildren: buildChildren,
  handleProps: handleProps,
  handleSpreadProps: handleSpreadProps,
  checkBuiltins: checkBuiltins,
  readMemberExpression: readMemberExpression
};