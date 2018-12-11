const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const builder = new ComponentBuilder(definition)
  // const list = builder.addTag('q-list')
  // list.addAttribute(':no-border', true)
  // definition.facts.forEach(({ title, value }) => {
  //   const item = list.addChildTag('q-item')
  //   const itemSide = item.addChildTag('q-item-side')
  //   itemSide.content(title)
  //   const itemMain = item.addChildTag('q-item-main')
  //   itemMain.content(value)
  // })

  const row = builder.addTag('div')
  row.addAttribute('class', 'row q-mt-sm')

  const colTitle = row.addChildTag('div')
  colTitle.addAttribute('class', 'col-auto q-mr-sm text-weight-bold')

  const colValue = row.addChildTag('div')
  colValue.addAttribute('class', 'col')

  definition.facts.forEach(({ title, value }) => {
    const t = colTitle.addChildTag('div')
    t.content(title)

    const v = colValue.addChildTag('div')
    v.content(value)
  })

  return builder.compile()
}
