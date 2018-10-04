const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function buttonListConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)

  const dropdown = builder.addTag('q-btn-dropdown')
  dropdown.addAttribute('label', getAttribute('heading'))
  dropdown.addAttribute('class', 'q-ma-xl')

  const list = dropdown.addChildTag('q-list')
  list.addAttribute(':link', true)

  getAttribute('actions').forEach(action => {
    const item = list.addChildTag('q-item')
    const itemMain = item.addChildTag('q-item-main')
    const itemTile = itemMain.addChildTag('q-item-tile')
    itemTile.addAttribute(':label', true)
    itemTile.content(action.title)
  })
  return builder.compile()
}
