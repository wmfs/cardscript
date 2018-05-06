const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function switchConverter (widgetDefinition, options) {
  // default
  // desc
  // enabled
  // heading
  // help
  // mandatory
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const sw = builder.addTag('v-switch')
  sw.addAttribute('label', getAttribute('heading'))
  sw.bindToModel(widgetDefinition)
  return builder.compile()
}
