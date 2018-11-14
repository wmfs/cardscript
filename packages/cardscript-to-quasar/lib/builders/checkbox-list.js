const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function checkboxList (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)

  const builder = new ComponentBuilder(widgetDefinition)
  const field = builder.addTag('q-field')
  field.addAttribute('class', 'q-ma-xl')
  field.addAttribute('label', getAttribute('heading'))

  const optionGroup = field.addChildTag('q-option-group')
  optionGroup.addAttribute('class', 'q-ml-xl')
  optionGroup.addAttribute('type', 'checkbox')
  optionGroup.addAttribute(':options', `lists.${widgetDefinition.id}`)
  optionGroup.bindToModel(widgetDefinition)

  field.addAttribute(':error', `$v.data.${widgetDefinition.id} && $v.data.${widgetDefinition.id}.$error`)

  return builder.compile()
}
