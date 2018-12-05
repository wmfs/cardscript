// const processSchemaErrors = require('./../../utils/process-schema-errors')

module.exports = function simpleFormatter (validationResult) {
  // const processedSchemaErrors = processSchemaErrors(validationResult.errors)
  // return {
  //   widgetsValid: processedSchemaErrors.length === 0,
  //   errors: processedSchemaErrors
  // }

  return {
    widgetsValid: validationResult.errors.length === 0,
    errors: validationResult.errors
  }
}
