const makeBaseElement = require('../utils/make-base-element')
const addDescriptions = require('../utils/add-descriptions')

module.exports = function inputTextElementGenerator (key, config, options) {
  const elements = []
  const textElement = makeBaseElement(key, 'Input.Text', config)

  addDescriptions(textElement, config)

  elements.push(textElement)
  return elements
}
