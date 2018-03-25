const _ = require('lodash')
const jsonfile = require('jsonfile')
const path = require('path')

module.exports = function collateData () {
  const schema = jsonfile.readFileSync(
    path.resolve(__dirname, './../../../packages/formscript-schema/lib/schema.json')
  )

  const propertyInfo = []
  _.forEach(
    schema.definitions,
    function (rawPropertyCandidate, key) {
      if (key !== 'attributes' && key !== 'widgets') {
        const propertyDefinition = _.cloneDeep(rawPropertyCandidate)
        propertyDefinition.name = key
        propertyInfo.push(propertyDefinition)
      }
    }
  )

  const widgetInfo = []
  _.forEach(
    schema.definitions.widgets,
    function (rawWidgetDefinition, widgetType) {
      const widgetDefinition = _.cloneDeep(rawWidgetDefinition)
      widgetDefinition.type = widgetType
      widgetInfo.push(widgetDefinition)
    }
  )

  const attributeInfo = []
  _.forEach(
    schema.definitions.attributes,
    function (rawAttributeDefinition, attributeName) {
      const attributeDefinition = _.cloneDeep(rawAttributeDefinition)
      attributeDefinition.name = attributeName
      attributeInfo.push(attributeDefinition)
    }
  )

  const lernaJson = jsonfile.readFileSync(
    path.resolve(__dirname, './../../../lerna.json')
  )

  const simpleExample = jsonfile.readFileSync(
    path.resolve(__dirname, './../../../packages/formscript-schema/test/fixtures/simple-form.json')
  )

  const data = {
    version: lernaJson.version,
    simpleExample: JSON.stringify(simpleExample, null, 2),
    widgets: _.sortBy(widgetInfo, 'type'),
    attributes: _.sortBy(attributeInfo, 'name'),
    properties: propertyInfo
  }
  return data
}
