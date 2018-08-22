const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function tableConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)

  const headers = getAttribute('columns').map(col => {
    return {
      text: col.title,
      value: col.dataPath
    }
  })

  const table = builder.addTag('v-data-table')
  table.addAttribute(':items', `data.${getAttribute('dataPath')}`)

  const header = table.addChildTag('template')
  header.addAttribute('slot', 'headers')
  header.addAttribute('slot-scope', 'props')

  const headerTR = header.addChildTag('tr')

  for (const header of headers) {
    const th = headerTR.addChildTag('th')
    th.addAttribute(':key', header.value)
    th.addAttribute('class', 'text-sm-left')
    th.content(header.text)
  }

  const items = table.addChildTag('template')
  items.addAttribute('slot', 'items')
  items.addAttribute('slot-scope', 'props')

  const itemsTR = items.addChildTag('tr')

  for (const header of headers) {
    const td = itemsTR.addChildTag('td')
    td.addAttribute('class', 'text-xs-left')
    td.content(`{{props.item.${header.value}}}`)
  }

  return builder.compile()
}
