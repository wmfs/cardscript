const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const {
    title,
    arrayPath,
    columns
  } = definition

  const builder = new ComponentBuilder(definition)

  const table = builder.addTag('q-table')
  table.addAttribute('title', title)
  table.addAttribute(':data', `data.${arrayPath}`)
  // table.addAttribute('v-if', `data.${arrayPath}`)

  table.addAttribute(':columns', `[${columns.map(({ title, field }) => {
    return `{ label: '${title}', field: '${field}', align: 'left' }`
  })}]`)

  // const tr = table.addChildTag('q-tr')
  // tr.addAttribute('slot', 'header')
  // tr.addAttribute('slot-scope', 'props')
  //
  // for (const col of columns) {
  //   const th = tr.addChildTag('q-th')
  //   th.addAttribute('key', col.field)
  //   th.addAttribute(':props', 'props')
  //   th.content(col.title)
  // }

  return builder.compile()
}
