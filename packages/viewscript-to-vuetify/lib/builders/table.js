const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function tableConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)

  const headers = getAttribute('columns').map(col => {
    return {
      text: col.title,
      value: col.dataPath,
      align: 'left'
    }
  })

  const dataTable = builder.addTag('v-data-table')
  dataTable.addAttribute(':items', `data.${getAttribute('dataPath')}`)

  const headerTemplate = dataTable.addChildTag('template')
  headerTemplate.addAttribute('slot', 'headers')

  const headerTR = headerTemplate.addChildTag('tr')

  for (const header of headers) {
    const headerTH = headerTR.addChildTag('th')
    headerTH.content(header.text)
  }

  return builder.compile()
}
