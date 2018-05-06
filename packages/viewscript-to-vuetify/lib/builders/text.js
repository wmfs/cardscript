const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

// default
// desc
// enabled
// heading
// help
// mandatory
// maxCharacters
// minCharacters
// placeholder

module.exports = function textConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const textField = builder.addTag('v-text-field')
  textField.addAttribute('id', widgetDefinition.id)
  textField.bindToModel(widgetDefinition)
  textField.addAttribute('name', widgetDefinition.id)
  textField.addAttribute('label', getAttribute('heading'))
  textField.addAttribute('placeholder', getAttribute('placeholder'))
  textField.addAttribute('hint', getAttribute('desc'))
  return builder.compile()
}
