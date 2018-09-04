const parse = require('esprima').parse

module.exports = function viewscriptToAst (viewscript) {
  const asts = {}

  viewscript.forEach(expression => {
    const ast = parse(expression.expression)
    asts[expression.widget] = ast
  })
  /*
  asts: {
    id: ast,
    id: ast,
    ...
  }
  */
  // TODO: on set widget handle nested expressions
  return asts
}
