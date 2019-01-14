const _ = require('lodash')
const jsonfile = require('jsonfile')
const path = require('path')

module.exports = function getSimpleManifest () {
  const schema = jsonfile.readFileSync(
    path.resolve(__dirname, './../schema.json')
  )

  let toSkip = ['Action', 'Actions', 'CardElement', 'CardElements', 'ChoiceInputStyle', 'HorizontalAlignment',
    'ImageSize', 'ImageStyle', 'SeparatorStyle', 'SpacingStyle', 'TextInputStyle']

  let containerElements = ['Container', 'Column', 'ColumnSet', 'TabSet', 'Tab', 'Collapsible', 'ActionSet', 'ImageSet']

  let filteredSchema = []
  Object.keys(schema.definitions).map(key => {
    if (!toSkip.includes(key)) {
      filteredSchema.push(key)
    }
  })

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

  const actions = []
  const containers = []
  const elements = []
  const inputs = []
  filteredSchema.forEach(elementType => {
    const rawElementDefinition = schema.definitions[elementType]
    // console.log(rawElementDefinition)
    const elementDefinition = _.cloneDeep(rawElementDefinition)
    elementDefinition.type = elementType
    elementDefinition.example = 'FIXME!'
    if (elementDefinition.hasOwnProperty('properties')) {
      elementDefinition.propertySummary = calculatePropertySummary(elementType, propertyInfo, rawElementDefinition)
    } else {
      elementDefinition.propertySummary = []
    }
    // elementDefinition.attributeSummary = _.sortBy(calculateAttributeSummary(elementType, schema.definitions.attributes, rawElementDefinition), 'name')

    if (elementType.includes('Action.')) {
      actions.push(elementDefinition)
    } else if (elementType.includes('Input.')) {
      inputs.push(elementDefinition)
    } else if (containerElements.includes(elementType)) {
      containers.push(elementDefinition)
    } else {
      elements.push(elementDefinition)
    }
  })

  const attributeInfo = filteredSchema.map(attributeName => {
    const attributeDefinition = _.cloneDeep(schema.definitions[attributeName])
    attributeDefinition.name = attributeName
    return attributeDefinition
  })

  const lernaJson = jsonfile.readFileSync(
    path.resolve(__dirname, './../../../../lerna.json')
  )

  return {
    year: new Date().getFullYear(),
    version: lernaJson.version,
    actions: _.sortBy(actions, 'type'),
    containers: _.sortBy(containers, 'type'),
    elements: _.sortBy(elements, 'type'),
    inputs: _.sortBy(inputs, 'type'),
    attributes: _.sortBy(attributeInfo, 'name'),
    properties: propertyInfo,
    topLevelProperties: topLevelProperties
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
