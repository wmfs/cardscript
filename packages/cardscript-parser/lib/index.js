const _ = require('lodash')
const YAML = require('yamljs')

module.exports = function cardscriptParser (raw) {
  // widgetsValid
  // errors
  //   widgetIndex
  //   property
  //   message

  let parsed
  const errors = []
  if (_.isString(raw)) {
    try {
      parsed = JSON.parse(raw)
    } catch (jsonError) {
      // Failed to parse JSON, is it YAML?
      try {
        const parsedYaml = YAML.parse(raw)
        if (!_.isObject(parsedYaml)) {
          // Couldn't derive an object via YAML either, so let's return the JSON error.
          errors.push(
            {
              property: 'string',
              message: jsonError.toString()
            }
          )
        } else {
          parsed = parsedYaml
        }
      } catch (yamlError) {
        errors.push(
          {
            property: 'string',
            message: jsonError.toString()
          }
        )
      }
    }
  } else {
    errors.push(
      {
        property: 'string',
        message: `Expected a string to parse, instead got '${typeof raw}'`
      }
    )
  }
  return {
    parsed: parsed,
    errors: errors
  }
}
