const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function expandableNoticeConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)

  const collapsible = builder.addTag('q-collapsible')
  collapsible.addAttribute('label', getAttribute('heading'))
  collapsible.addAttribute('class', 'q-ma-xl')

  const div = collapsible.addChildTag('div')
  div.content(getAttribute('content'))

  return builder.compile()
}
