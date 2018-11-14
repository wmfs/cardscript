const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function textareaConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const input = builder.addTag('q-input')
  input.bindToModel(widgetDefinition)
  input.addAttribute('type', 'textarea')
  input.addAttribute('float-label', getAttribute('heading'))
  input.addAttribute('class', 'q-ma-xl')
  input.addAttribute(':error', `$v.data.${widgetDefinition.id} && $v.data.${widgetDefinition.id}.$error`)
  return builder.compile()
}
