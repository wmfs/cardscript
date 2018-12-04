const { isString } = require('lodash')

module.exports = function extractWidgetIndexFromSchemaError (rawError) {
  let index
  if (rawError && isString(rawError.property)) {
    const match = rawError.property.match(/^instance.widgets\[([0-9]+)/)[1]
    if (isString(match)) {
      try {
        index = parseInt(match)
      } catch (err) {
        // If this isn't a number, then just silently fail and return undefined
      }
    }
  }
  return index
}
