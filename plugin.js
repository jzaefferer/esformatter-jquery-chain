var repeat = require('mout/string/repeat');
var rocambole = require('rocambole');
var _tk = require('rocambole-token');

var _opts;

exports.setOptions = function(opts) {
  _opts = opts.indent;
};

exports.transformAfter = function(ast) {
  rocambole.recursive(ast, transform);
};

function transform(node) {
  if (node.type !== 'MemberExpression') return;

  var nested = recursiveNestedContext(node);
  if (nested) {
    // TODO the property could be on multiple lines, need to update all of them
    addIndent(node, nested);
    updateLineComments(node, nested);
  }
}

function oneUp(node) {
  return node.property.name === 'end';
}

function indented(node) {
  var token = node.property.startToken.prev.prev;
  return !!(_tk.isEmpty(token) && token.value.length);
}

function oneDown(node) {
  return /^(:?map|filter|parent|parents|children|find|next|prev|nextAll|prevAll|closest|not|first|last|addBack)$/
    .test(node.property.name) && indented(node);
}

function objectWithMemberExpressionCallee(node) {
  return node.object.type === 'CallExpression' &&
    node.object.callee.type === 'MemberExpression';
}

function recursiveNestedContext(node) {
  var nested = 0;
  if (!indented(node)) {
    return 0;
  }
  while (objectWithMemberExpressionCallee(node)) {
    if (oneUp(node)) {
      nested -= 1;
    }
    node = node.object.callee;
    if (oneDown(node)) {
      nested += 1;
    }
  }
  return nested;
}

function hasBr(start, end) {
  return _tk.findInBetween(start, end, _tk.isBr);
}

function addIndent(node, nested) {

  // The easy part: Indent the MemberExpression property
  var indent = _tk.findPrev(node.property.startToken, _tk.isIndent);
  indent.value += repeat(_opts.value, nested);

  // The hard part: Indent multi-line arguments of the parent call expression
  if (node.parent.type === 'CallExpression' && node.parent.arguments.length) {
    var args = node.parent.arguments;
    var start = args[0].startToken;
    var end = args[args.length - 1].endToken;
    if (hasBr(start, end)) {
      while (end != start) {
        end = end.prev;
        if (_tk.isIndent(end)) {
          end.value += repeat(_opts.value, nested);
        }
      }
    }
  }
}

function updateLineComments(node, nested) {
  var search = node.property.startToken;
  while (search && search !== node.startToken) {
    search = _tk.findPrevNonEmpty(search);
    if (_tk.isComment(search)) {
      var nextIndent = _tk.findNext(search, _tk.isIndent);
      _tk.findPrev(search, _tk.isIndent).value = nextIndent.value;
    }
  }
}
