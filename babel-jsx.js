var esutils = require('esutils');
var isIdentifierNameES6 = esutils.keyword.isIdentifierNameES6;

var DEFAULT_TAG_CALL = 'JSX.tag';

// this.scope.hasBinding("name")` checks for local bindings
// this.scope.hasOwnBinding("name")` only checks the current scope
// this.scope.hasGlobal("name")`


module.exports = function(babel) {
  var t = babel.types;

  return new babel.Transformer('jsx-ir', {
    // @done
    JSXIdentifier: function (node) {
      if (node.name === 'this' && this.isReferenced()) {
        return t.thisExpression();
      } else if (isIdentifierNameES6(node.name)) {
        node.type = 'Identifier';
      } else {
        return t.literal(node.name);
      }
    },
    // @done
    JSXNamespacedName: function(node) {
      node = t.identifier(node.namespace.name + ':' + node.name.name);
      node.namespaced = true;

      return node;
    },
    // @done
    JSXMemberExpression: {
      exit: function(node) {
        // node.computed = t.isLiteral(node.property);
        // node.type = "MemberExpression";
        return t.identifier(node.object.name + '.' + node.property.name);
      }
    },
    // @done
    JSXEmptyExpression: function (node) {
      node.type = 'Literal';
      node.value = null;
    },
    // @done
    JSXExpressionContainer: function(node) {
      return node.expression;
    },
    // @???
    JSXAttribute: {
      enter: function(node) {
        var value = node.value;

        if (t.isLiteral(value) && typeof value.value === 'string') {
          value.value = value.value.replace(/\n\s+/g, " ");
        }
      },

      exit: function(node) {
        var name = node.name;
        var value = node.value || t.literal(true);

        return t.inherits(t.property('init', name, value), node);
      }
    },
    // @done
    JSXOpeningElement: {
      exit: function(node) {
        var props = node.attributes;

        props = props.map(function(prop) {
          var propName = prop.key.name || prop.key.value;

          if (isIdentifierNameES6(propName)) {
            propName = t.identifier(propName);
          } else {
            propName = t.literal(propName);
          }

          return t.property('init', propName, prop.value);
        });

        var item = t.objectExpression([
          t.property('init', t.identifier('tag'), t.literal(node.name.name)),
          t.property('init', t.identifier('props'), props.length ? t.objectExpression(props) : t.literal(null))
        ]);

        return item;
      }
    },
    // @done
    JSXElement: {
      exit: function(node) {
        var item = node.openingElement;
        var children = buildChildren(node.children, t);

        children = children.length ? t.arrayExpression(children) : t.literal(null);
        item.properties.push(
          t.property('init', t.identifier('children'), children)
        );

        return t.inherits(item, node);
      }
    },

    Expression: function(node, parent) {
      if (this.isCompletionRecord()) {
        // console.log(parent);
      }
    },
    Program: function(node) {
      // console.log(node);
    }
  });
};


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
        trimmedLine += " ";
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