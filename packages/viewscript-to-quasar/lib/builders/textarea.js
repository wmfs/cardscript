const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function textareaConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const input = builder.addTag('q-input')
  input.bindToModel(widgetDefinition)
  input.addAttribute('type', 'textarea')
  input.addAttribute('float-label', getAttribute('heading'))
  return builder.compile()
}
