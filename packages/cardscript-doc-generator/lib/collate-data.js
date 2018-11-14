const _ = require('lodash')
const jsonfile = require('jsonfile')
const path = require('path')
const examples = require('cardscript-examples')
const snippets = require('./snippets')
const stopText = require('./stop-text')
const getPackageInfo = require('./get-package-info')

module.exports = function collateData () {
  const schema = jsonfile.readFileSync(
    path.resolve(__dirname, './../../../packages/cardscript-schema/lib/schema.json')
  )

  const topLevelProperties = Object.keys(schema.properties).map(key => {
    const value = schema.properties[key]
    return {
      name: key,
      type: value.type,
      required: schema.required.indexOf(key) !== -1,
      desc: value.title
    }
  })

  const propertyInfo = []
  Object.keys(schema.definitions).forEach(key => {
    if (key !== 'attributes' && key !== 'widgets') {
      const propertyDef = _.cloneDeep(schema.definitions[key])
      propertyDef.name = key
      propertyInfo.push(propertyDef)
    }
  })

  const widgetInfo = Object.keys(schema.definitions.widgets).map(widgetType => {
    const rawWidgetDefinition = schema.definitions.widgets[widgetType]
    const widgetDefinition = _.cloneDeep(rawWidgetDefinition)
    widgetDefinition.type = widgetType
    widgetDefinition.example = JSON.stringify(snippets[widgetType], null, 2)
    widgetDefinition.propertySummary = calculatePropertySummary(widgetType, propertyInfo, rawWidgetDefinition)
    widgetDefinition.attributeSummary = _.sortBy(calculateAttributeSummary(widgetType, schema.definitions.attributes, rawWidgetDefinition), 'name')
    return widgetDefinition
  })

  const attributeInfo = Object.keys(schema.definitions.attributes).map(attributeName => {
    const attributeDefinition = _.cloneDeep(schema.definitions.attributes[attributeName])
    attributeDefinition.name = attributeName
    return attributeDefinition
  })

  const lernaJson = jsonfile.readFileSync(
    path.resolve(__dirname, './../../../lerna.json')
  )

  return {
    stopText: stopText,
    year: new Date().getFullYear(),
    version: lernaJson.version,
    simpleExample: JSON.stringify(examples.simple, null, 2),
    simpleSetExample: JSON.stringify(examples.set, null, 2),
    expressionExample: JSON.stringify(examples.expression, null, 2),
    widgets: _.sortBy(widgetInfo, 'type'),
    attributes: _.sortBy(attributeInfo, 'name'),
    properties: propertyInfo,
    topLevelProperties: topLevelProperties,
    packages: getPackageInfo()
  }
}

function calculatePropertySummary (widgetType, widgetProperties, rawWidgetDefinition) {
  const rawProps = rawWidgetDefinition.properties
  const summary = []
  widgetProperties.forEach(prop => {
    if (rawProps.hasOwnProperty(prop.name)) {
      let text = rawWidgetDefinition.required.includes(prop.name) ? '_Required_' : '_Optional_'

      if (prop.name === 'type') {
        text += ` (\`"${widgetType}"\`)`
      }

      summary.push({name: prop.name, text})
    }
  })
  return summary
}

function calculateAttributeSummary (widgetType, attributeProperties, rawWidgetDefinition) {
  const rawAttribs = rawWidgetDefinition.properties.attributes
  const summary = []
  if (rawAttribs) {
    Object.keys(rawAttribs.properties).map(key => {
      const value = rawAttribs.properties[key]

      const attributeSchema = _.isObject(value) && value.hasOwnProperty('$ref')
        ? attributeProperties[value.$ref.slice(25)] // Remove: #/definitions/attributes/
        : value

      const requiredAttributes = rawWidgetDefinition.properties.attributes.required
      const required = requiredAttributes && requiredAttributes.indexOf(key) !== -1
        ? 'Yes' : 'No'

      let attributeType = attributeSchema.type
      if (_.isUndefined(attributeType) && _.isArray(attributeSchema.enum)) {
        attributeType = `__enum:__<br>`
        attributeSchema.enum.forEach(value => { attributeType += `\`${value}\`<br>` })
      } else {
        attributeType = '`' + attributeType + '`'
      }

      summary.push({
        name: key,
        type: attributeType,
        text: attributeSchema.title,
        required: required
      })
    })
  }

  return summary
}
