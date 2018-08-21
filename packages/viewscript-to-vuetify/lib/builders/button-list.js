const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function buttonListConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)

  const menu = builder.addTag('v-menu')
  menu.addAttribute(':offset-y', true)

  const btn = menu.addChildTag('v-btn')
  btn.addAttribute('slot', 'activator')
  btn.content(getAttribute('heading'))

  const list = menu.addChildTag('v-list')
  getAttribute('actions').forEach(action => {
    const tile = list.addChildTag('v-list-tile')
    tile.addAttribute('@click', null)
    const title = tile.addChildTag('v-list-tile-title')
    title.content(action.title)
  })
  return builder.compile()
}
