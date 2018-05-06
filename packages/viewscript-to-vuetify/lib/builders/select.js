const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function selectConverter (widgetDefinition, options) {
  // default
  // desc
  // enabled
  // heading
  // help
  // mandatory
  // numericValue
  // titleMap
  const getAttribute = GetAttribute(widgetDefinition)

  const builder = new ComponentBuilder(widgetDefinition)
  const select = builder.addTag('v-select')
  select.bindToModel(widgetDefinition)
  select.addAttribute(':items', `lists.${widgetDefinition.id}`)
  select.addAttribute('label', getAttribute('heading'))
  return builder.compile()
}
