const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function numberConverter (widgetDefinition, options) {
  // default
  // desc
  // enabled
  // heading
  // help
  // mandatory
  // maximum
  // minimum
  // placeholder

  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const textField = builder.addTag('v-text-field')
  textField.addAttribute('id', widgetDefinition.id)
  textField.bindToModel(widgetDefinition, 'number')
  textField.addAttribute('name', widgetDefinition.id)
  textField.addAttribute('type', 'number')
  textField.addAttribute('label', getAttribute('heading'))
  textField.addAttribute('placeholder', getAttribute('placeholder'))
  textField.addAttribute('hint', getAttribute('desc'))
  return builder.compile()
}
