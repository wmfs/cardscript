const _ = require('lodash')
const jsonfile = require('jsonfile')
const path = require('path')
const exampleLoader = require('formscript-examples')

module.exports = function collateData () {
  const schema = jsonfile.readFileSync(
    path.resolve(__dirname, './../../../packages/formscript-schema/lib/schema.json')
  )

  const topLevelProperties = []
  _.forEach(
    schema.properties,
    function (value, name) {
      topLevelProperties.push(
        {
          name: name,
          type: value.type,
          required: schema.required.indexOf(name) !== -1,
          desc: value.title
        }
      )
    }
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
      widgetDefinition.example = JSON.stringify(exampleLoader(`standalone-${_.kebabCase(widgetType)}`), null, 2)
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
    path.resolve(__dirname, './../../formscript-examples/fixtures/simple-form.json')
  )

  const expressionExample = jsonfile.readFileSync(
    path.resolve(__dirname, './../../formscript-examples/fixtures/simple-expression.json')
  )

  const data = {
    year: new Date().getFullYear(),
    version: lernaJson.version,
    simpleExample: JSON.stringify(simpleExample, null, 2),
    expressionExample: JSON.stringify(expressionExample, null, 2),
    widgets: _.sortBy(widgetInfo, 'type'),
    attributes: _.sortBy(attributeInfo, 'name'),
    properties: propertyInfo,
    topLevelProperties: topLevelProperties
  }
  return data
}
