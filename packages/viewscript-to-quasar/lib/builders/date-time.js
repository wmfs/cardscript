const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function dateTimeConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const field = builder.addTag('q-field')
  field.addAttribute(':error', `$v.data.${widgetDefinition.id} && $v.data.${widgetDefinition.id}.$error`)
  const dateTime = field.addChildTag('q-datetime')
  dateTime.bindToModel(widgetDefinition)
  dateTime.addAttribute('type', 'datetime')
  dateTime.addAttribute('float-label', getAttribute('heading'))
  dateTime.addAttribute('class', 'q-ma-xl')
  return builder.compile()
}
