const _ = require('lodash')
const elementGeneratorPicker = require('./element-generator-picker')
const elementGenerators = require('./element-generators')

module.exports = function addElementsFromProperties (root, targetArray, options) {
  if (root.hasOwnProperty('properties')) {
    Object.entries(root.properties).forEach((entry) => {
      const [key, originalProperty] = entry
      let property = _.cloneDeep(originalProperty)
      if (property.hasOwnProperty('type')) {
        // Sort multiple
        if (property.type === 'array') {
          property.multiple = true
          // Promote any item-level attributes to top-level
          property = _.defaults(property, property.items)
          property.type = property.items.type
          delete property.items
        } else {
          property.multiple = false
        }

        // Derive if required
        if (root.hasOwnProperty('required')) {
          property.propertyRequired = root.required.indexOf(key) !== -1
        } else {
          property.propertyRequired = false
        }

        const elementGeneratorName = elementGeneratorPicker(
          key,
          property,
          options
        )
        if (elementGeneratorName && elementGenerators.hasOwnProperty(elementGeneratorName)) {
          const elements = elementGenerators[elementGeneratorName](
            key,
            property,
            options
          )
          if (elements.length > 0) {
            targetArray.push(...elements)
          }
        } else {
          console.error(`FAILED TO MAP ${key} TO GENERATOR (Unable to find generator '${elementGeneratorName}')`)
        }
      }
    })
  }
}
