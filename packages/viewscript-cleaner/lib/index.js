const evaluate = require('static-eval')
const parse = require('esprima').parse

const getExpressions = require('./helpers/get-expressions')

module.exports = function viewscriptCleaner (viewscript, data) {
  // TODO: get 'showWhen' blocks from the viewscript OR validation schema which should come from the validation package in Viewscript
  const expressions = getExpressions(viewscript)
  // TODO: use parse function from esprima to create AST's of 'showWhen' expressions
  // TODO: use evaluate function on parsed expressions to check if data should be present
  expressions.map(expression => {
    const ast = parse(expression.expression)
    // If the result of evaluating the AST is false, then it's hidden, and should be cleared
    if (evaluate(ast.body[0], {data}) === false) {
      data[expressions[0].widget] = null
    }
  })

  return data
  // TODO: strip unnecessary data from the formData object and return 'cleaned' formData
}
