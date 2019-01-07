const _ = require('lodash')

const makeBaseElement = require('../utils/make-base-element')

module.exports = function inputTextElementGenerator (key, config, options) {
  const elements = []
  const choiceSetElement = makeBaseElement(key, 'Input.ChoiceSet', config)
  choiceSetElement.choices = []
  config.enum.forEach(
    (value) => {
      const choice = {
        value: value
      }
      if (_.isString(value)) {
        choice.title = _.startCase(value)
      } else {
        choice.title = value
      }
      choiceSetElement.choices.push(choice)
    }
  )

  choiceSetElement.isMultiSelect = true
  // TODO: If required then auto-add validation for "minItems = 1" or similar?
  elements.push(choiceSetElement)
  return elements
}
