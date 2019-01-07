const makeBaseElement = require('../utils/make-base-element')
const addDescriptions = require('../utils/add-descriptions')

module.exports = function inputToggleElementGenerator (key, config, options) {
  const elements = []
  const numberElement = makeBaseElement(key, 'Input.Toggle', config)
  addDescriptions(numberElement, config)
  elements.push(numberElement)
  return elements
}
