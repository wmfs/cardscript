const processSchemaErrors = require('./../../utils/process-schema-errors')
module.exports = function simpleFormatter (validationResult) {
  return {
    formContentValid: validationResult.errors.length === 0,
    errors: processSchemaErrors(validationResult.errors)
  }
}
