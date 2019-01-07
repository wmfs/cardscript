const makeBaseElement = require('./utils/make-base-element')
const addDescriptions = require('./utils/add-descriptions')

module.exports = function inputTextElementGenerator (key, config, options) {
  const elements = []
  const numberElement = makeBaseElement(key, 'Input.Number', config)
  addDescriptions(numberElement, config)
  elements.push(numberElement)
  return elements
}
