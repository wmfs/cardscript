const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function tableConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)

  const columns = getAttribute('columns').map(col => {
    return {
      label: col.title,
      field: col.dataPath
    }
  })

  const table = builder.addTag('q-table')
  table.addAttribute('title', getAttribute('heading'))
  table.addAttribute(':data', `data.${getAttribute('dataPath')}`)
  table.addAttribute('v-if', `data.${getAttribute('dataPath')}`)

  const tr = table.addChildTag('q-tr')
  tr.addAttribute('slot', 'header')
  tr.addAttribute('slot-scope', 'props')

  for (const col of columns) {
    const th = tr.addChildTag('q-th')
    th.addAttribute('key', col.field)
    th.addAttribute(':props', 'props')
    th.content(col.label)
  }

  return builder.compile()
}
