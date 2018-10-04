const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function radioConverter (widgetDefinition, options) {
  // desc
  // enabled
  // heading
  // help
  // mandatory
  // numericValue
  // titleMap

  const getAttribute = GetAttribute(widgetDefinition)

  const builder = new ComponentBuilder(widgetDefinition)
  const field = builder.addTag('q-field')
  field.addAttribute('class', 'q-ma-xl')
  field.addAttribute('label', getAttribute('heading'))

  const titleMap = getAttribute('titleMap')
  titleMap.forEach(function (titleMap) {
    const radio = field.addChildTag('q-radio')
    radio.bindToModel(widgetDefinition)
    radio.addAttribute('label', titleMap.title || titleMap.value)
    radio.addAttribute('val', titleMap.value)
    field.addChildTag('br')
  })

  field.addAttribute(':error', `$v.data.${widgetDefinition.id} && $v.data.${widgetDefinition.id}.$error`)

  return builder.compile()
}
