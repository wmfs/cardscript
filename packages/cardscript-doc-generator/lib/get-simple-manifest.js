const _ = require('lodash')
const jsonfile = require('jsonfile')
const path = require('path')
const examples = require('cardscript-examples')
const snippets = require('./snippets')
const stopText = require('./stop-text')
const getPackageInfo = require('./get-package-info')

module.exports = function getSimpleManifest () {
  const schema = jsonfile.readFileSync(
    path.resolve(__dirname, './../../../packages/cardscript-schema/lib/schema.json')
  )

  let toSkip = ['Action', 'Actions', 'CardElement', 'CardElements', 'ChoiceInputStyle', 'HorizontalAlignment',
    'ImageSize', 'ImageStyle', 'SeparatorStyle', 'SpacingStyle', 'TextInputStyle']

  let filteredSchema = []
  Object.keys(schema.definitions).map(key => {
    if (!toSkip.includes(key)) {
      filteredSchema.push(key)
    }
  })

  console.log(filteredSchema)

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
  filteredSchema.forEach(key => {
    if (key !== 'attributes' && key !== 'elements') {
      const propertyDef = _.cloneDeep(schema.definitions[key])
      propertyDef.name = key
      propertyInfo.push(propertyDef)
    }
  })

  const elementInfo = filteredSchema.map(elementType => {
    const rawElementDefinition = schema.definitions[elementType]
    // console.log(rawElementDefinition)
    const elementDefinition = _.cloneDeep(rawElementDefinition)
    elementDefinition.type = elementType
    elementDefinition.example = JSON.stringify(snippets[elementType], null, 2)
    if (elementDefinition.hasOwnProperty('properties')) {
      elementDefinition.propertySummary = calculatePropertySummary(elementType, propertyInfo, rawElementDefinition)
    } else {
      elementDefinition.propertySummary = []
    }
    // elementDefinition.attributeSummary = _.sortBy(calculateAttributeSummary(elementType, schema.definitions.attributes, rawElementDefinition), 'name')
    return elementDefinition
  })

  const attributeInfo = filteredSchema.map(attributeName => {
    const attributeDefinition = _.cloneDeep(schema.definitions[attributeName])
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
    elements: _.sortBy(elementInfo, 'type'),
    attributes: _.sortBy(attributeInfo, 'name'),
    properties: propertyInfo,
    topLevelProperties: topLevelProperties,
    packages: getPackageInfo()
  }
}

function calculatePropertySummary (elementType, elementProperties, rawElementDefinition) {
  const rawProps = rawElementDefinition.properties
  const summary = []
  elementProperties.forEach(prop => {
    if (elementType === prop.name && rawElementDefinition.hasOwnProperty('required')) {
      Object.keys(rawProps).forEach(property => {
        let name = property
        let type = rawProps[property].type
        let required
        if (rawElementDefinition.required.includes(property)) {
          required = 'Required'
        } else {
          required = 'Optional'
        }
        let text = rawProps[property].description
        if (prop.name === 'type') {
          text += ` (\`"${elementType}"\`)`
        }
        summary.push({ name, type, required, text })
      })
    }
  })
  return summary
}

// function calculateAttributeSummary (elementType, attributeProperties, rawElementDefinition) {
//   const rawAttribs = rawElementDefinition.properties.attributes
//   const summary = []
//   if (rawAttribs) {
//     Object.keys(rawAttribs.properties).map(key => {
//       const value = rawAttribs.properties[key]
//
//       const attributeSchema = _.isObject(value) && value.hasOwnProperty('$ref')
//         ? attributeProperties[value.$ref.slice(25)] // Remove: #/definitions/attributes/
//         : value
//
//       const requiredAttributes = rawElementDefinition.properties.attributes.required
//       const required = requiredAttributes && requiredAttributes.indexOf(key) !== -1
//         ? 'Yes' : 'No'
//
//       let attributeType = attributeSchema.type
//       if (_.isUndefined(attributeType) && _.isArray(attributeSchema.enum)) {
//         attributeType = `__enum:__<br>`
//         attributeSchema.enum.forEach(value => { attributeType += `\`${value}\`<br>` })
//       } else {
//         attributeType = '`' + attributeType + '`'
//       }
//
//       summary.push({
//         name: key,
//         type: attributeType,
//         text: attributeSchema.title,
//         required: required
//       })
//     })
//   }
//
//   return summary
// }
