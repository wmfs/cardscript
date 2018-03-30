const _ = require('lodash')
const jsonfile = require('jsonfile')
const path = require('path')
const exampleLoader = require('formscript-examples')
const stopText = require('./stop-text')

function calculatePropertySummary (widgetType, widgetProperties, rawWidgetDefinition) {
  const rawProps = rawWidgetDefinition.properties
  const summary = []
  widgetProperties.forEach(
    function (prop) {
      if (rawProps.hasOwnProperty(prop.name)) {

        let text
        if (rawWidgetDefinition.required.indexOf(prop.name) === -1) {
          text = '_Optional_'
        } else {
          text = '_Mandatory_'
        }

        if (prop.name === 'type') {
          text += ` (\`${widgetType}\`)`
        }
        summary.push(
          {
            name: prop.name,
            text: text
          }
        )
      }
    }
  )
  return summary
}

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
      widgetDefinition.propertySummary = calculatePropertySummary(widgetType, propertyInfo, rawWidgetDefinition)
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
    stopText: stopText,
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
