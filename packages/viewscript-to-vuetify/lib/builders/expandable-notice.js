const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

// default
// content
// enabled
// heading
// help

module.exports = function expandableNoticeConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const expandableField = builder.addTag('v-expansion-panel')
  expandableField.addAttribute('id', widgetDefinition.id)

  const expansionContent = expandableField.addChildTag('v-expansion-panel-content')
  const div = expansionContent.addChildTag('div')
  div.addAttribute('slot', 'header')
  div.content(getAttribute('heading'))
  const card = expansionContent.addChildTag('v-card')
  const cardText = card.addChildTag('v-card-text')
  cardText.content(getAttribute('content'))

  return builder.compile()
}
