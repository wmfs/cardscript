const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function buttonListConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const div = builder.addTag('div')
  getAttribute('actions').forEach(action => {
    const btn = div.addChildTag('v-btn')
    btn.content(action.title)
  })
  return builder.compile()
}
