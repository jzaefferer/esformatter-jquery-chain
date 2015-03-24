var rocambole = require('rocambole');
var token = require('rocambole-token');
var indent = require('rocambole-indent');

exports.setOptions = function(opts) {
  indent.setOptions(opts.indent);
};

exports.transformAfter = function(ast) {
  rocambole.recursive(ast, transform);
};

function transform(node) {
  if (node.type !== 'MemberExpression') return;

  var nested = recursiveNestedContext(node);
  if (nested) {
    addIndent(node, nested);
    indent.alignComments(node);
  }
}

function oneUp(node) {
  return node.property.name === 'end';
}

function indented(node) {
  var indentToken = node.property.startToken.prev.prev;
  return !!(token.isEmpty(indentToken) && indentToken.value.length);
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
  return token.findInBetween(start, end, token.isBr);
}

function addIndent(node, nested) {
  // The easy part: Indent the MemberExpression property
  indent.addLevel(node.property.startToken, nested);

  // The hard part: Indent multi-line arguments of the parent call expression
  if (node.parent.type === 'CallExpression' && node.parent.arguments.length) {
    var args = node.parent.arguments;
    var start = args[0].startToken;
    var end = args[args.length - 1].endToken.next;
    if (hasBr(start, end)) {
      indent.inBetween(start, end, nested);
    }
  }
}
