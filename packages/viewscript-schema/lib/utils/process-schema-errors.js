const path = require('path')
const validator = require('jsonschema').validate
const dottie = require('dottie')
const _ = require('lodash')
const schema = require('./../schema')
const extractWidgetIndexFromSchemaError = require('./extract-widget-index-from-schema-error')
const widgetTypes = require('./widget-types')

module.exports = function processSchemaErrors (rawErrors) {
  // TODO: Just MVP, Needs loads of TLC... make recursive and similar

  const processedErrors = []
  rawErrors.forEach(
    rawError => {
      let replacementError = _.cloneDeep(rawError)

      // Extract widgets array index
      let idx = extractWidgetIndexFromSchemaError(rawError)
      if (_.isNumber(idx)) {
        replacementError.widgetIndex = idx
        replacementError.property = `The widget defined at index ${idx}`
        const widgetType = dottie.get(rawError, 'instance.type')
        if (widgetType) {
          if (widgetTypes.indexOf(widgetType) === -1) {
            replacementError.message = `refers to an unknown type of "${widgetType}"`
          } else {
            // Type is known, so validate the widget specifically against its own
            // schema as to derive a more precise message.
            const widgetId = dottie.get(replacementError, 'instance.id')
            const widgetTypeSchema = _.cloneDeep(dottie.get(schema, `definitions.widgets.${widgetType}`))
            widgetTypeSchema.definitions = schema.definitions
            const result = validator(replacementError.instance, widgetTypeSchema)

            result.errors.forEach(
              function (originalWidgetError) {
                const clonedWidgetError = _.cloneDeep(originalWidgetError)
                clonedWidgetError.widgetId = dottie.get(replacementError, 'instance.id')
                clonedWidgetError.widgetIndex = replacementError.widgetIndex
                if (clonedWidgetError.widgetId) {
                  clonedWidgetError.property = `The "${widgetType}" widget (with id "${widgetId}") at index ${idx}`
                } else {
                  clonedWidgetError.property = `The "${widgetType}" widget defined at index ${idx}`
                }

                // Conjure a more meaningful message if attribute-based
                const stack = clonedWidgetError.stack
                const firstWord = stack.slice(0, stack.indexOf(' '))
                const propertyParts = firstWord.split('.')
                if (propertyParts.length > 2 && propertyParts[1] === 'attributes') {
                  clonedWidgetError.message = `has a "${propertyParts[2]}" attribute that ${stack.slice(stack.indexOf(' ') + 1)}`
                } else {
                  clonedWidgetError.message = clonedWidgetError.stack
                }

                processedErrors.push(clonedWidgetError)
              }
            )

            replacementError = null // No need to push the original top-level error
          }
        } else {
          replacementError.message = 'contains no usable "type" property'
        }
      }
      if (replacementError) {
        processedErrors.push(replacementError)
      }
    }
  )
  return processedErrors
}
