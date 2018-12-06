const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const builder = new ComponentBuilder(definition)
  const list = builder.addTag('q-list')
  list.addAttribute(':no-border', true)
  definition.facts.forEach(({ title, value }) => {
    const item = list.addChildTag('q-item')
    const itemSide = item.addChildTag('q-item-side')
    itemSide.content(title)
    const itemMain = item.addChildTag('q-item-main')
    itemMain.content(value)
  })
  return builder.compile()
}
