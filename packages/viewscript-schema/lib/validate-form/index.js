const viewscriptSchema = require('../schema')
const validator = require('jsonschema').validate
const formatters = require('./formatters')
module.exports = function validateForm (formDefinition, options) {
  const result = validator(formDefinition, viewscriptSchema)

  // TODO: Make this more robust!
  if (options === undefined) {
    options = {}
  }

  let formatter
  if (options.format) {
    formatter = formatters[options.format]
    if (!formatter) {
      throw new Error(`Unknown format '${options.format}'`)
    }
  } else {
    formatter = formatters.simple
  }

  return formatter(result)
}
