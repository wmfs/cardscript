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
  const textField = builder.addTag('q-input')
  textField.addAttribute('id', widgetDefinition.id)
  textField.bindToModel(widgetDefinition, 'number')
  textField.addAttribute('class', 'q-ma-xl')
  textField.addAttribute('type', 'number')
  textField.addAttribute('float-label', getAttribute('heading'))
  textField.addAttribute(':error', `$v.data.${widgetDefinition.id} && $v.data.${widgetDefinition.id}.$error`)
  // textField.addAttribute(':dark', 'dark')
  return builder.compile()
}
