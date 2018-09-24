const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function questionnaireConverter (widgetDefinition, options) {
  // default
  // desc
  // enabled
  // heading
  // help
  // mandatory
  // numericValue
  // titleMap

  /*
  const getAttribute = GetAttribute(widgetDefinition)

  const builder = new ComponentBuilder(widgetDefinition)
  const heading = builder.addTag('div')
  heading.addAttribute('class', 'display-1 grey--text text--darken-1 mt-4')
  heading.content(getAttribute('heading'))

  const desc = getAttribute('desc')
  if (desc) {
    const desc = builder.addTag('div')
    desc.addAttribute('class', 'subheading grey--text text--darken-1 mb-2')
    desc.content(getAttribute('desc'))
  }

  const group = builder.addTag('v-radio-group')
  group.bindToModel(widgetDefinition)

  const titleMap = getAttribute('titleMap')
  titleMap.forEach(function (titleMap) {
    const radio = group.addChildTag('v-radio')
    radio.addAttribute('key', `${widgetDefinition.id}_${titleMap.value}`)
    radio.addAttribute('label', titleMap.title || titleMap.value)
    radio.addAttribute('value', titleMap.value)
  })

  return builder.compile()
  */

  const getAttribute = GetAttribute(widgetDefinition)

  const builder = new ComponentBuilder(widgetDefinition)
  const field = builder.addTag('q-field')
  field.addAttribute('class', 'q-ma-xl')
  field.addAttribute('label', getAttribute('heading'))
  field.addAttribute(':error', `$v.data.${widgetDefinition.id} && $v.data.${widgetDefinition.id}.$error`)

  const titleMap = getAttribute('titleMap')
  titleMap.forEach(function (titleMap) {
    const radio = field.addChildTag('q-radio')
    radio.bindToModel(widgetDefinition)
    radio.addAttribute('label', titleMap.title || titleMap.value)
    radio.addAttribute('val', titleMap.value)
    field.addChildTag('br')
  })

  return builder.compile()
}
