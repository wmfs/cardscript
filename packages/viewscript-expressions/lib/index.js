const getExpressions = require('./viewscript-to-expressions')
const toAsts = require('./viewscript-to-ast')
const calculateVisibility = require('./calculate-widget-visibility')
const clean = require('./clean-viewscript')

module.exports = function viewscriptCleaner (viewscript, data) {
  const expressions = getExpressions(viewscript)
  const asts = toAsts(expressions)

  const visList = calculateVisibility(viewscript, data, asts)
  console.log('Visibility List: ', visList)

  const cleaned = clean(data, visList)
  return cleaned
}
