const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function checkboxList (widgetDefinition, options) {
  // default
  // desc
  // enabled
  // heading
  // mandatory
  // maxLimit
  // minLimit
  // numericValue
  // titleMap
/*
  // const getAttribute = GetAttribute(widgetDefinition)

  const getAttribute = GetAttribute(widgetDefinition)

  const builder = new ComponentBuilder(widgetDefinition)
  const title = builder.addTag('div')
  title.addAttribute('class', 'display-1 grey--text text--darken-1 my-4')
  title.content(getAttribute('heading'))

  const desc = getAttribute('desc')
  if (desc) {
    const subTitle = builder.addTag('div')
    subTitle.addAttribute('class', 'subheading grey--text text--darken-1 mb-2')
    subTitle.content(desc)
  }

  const titleMap = getAttribute('titleMap')
  titleMap.forEach(function (titleMap) {
    const checkbox = builder.addTag('v-checkbox')
    checkbox.bindToModel(widgetDefinition)
    checkbox.addAttribute('label', titleMap.title || titleMap.value)
    checkbox.addAttribute('value', titleMap.value)
  })

  return builder.compile()
  */

  const getAttribute = GetAttribute(widgetDefinition)

  const builder = new ComponentBuilder(widgetDefinition)
  const caption = builder.addTag('p')
  caption.addAttribute('class', 'q-ml-xl caption')
  caption.content(getAttribute('heading'))

  const optionGroup = builder.addTag('q-option-group')
  optionGroup.addAttribute('class', 'q-ml-xl')
  optionGroup.addAttribute('type', 'checkbox')
  optionGroup.addAttribute(':options', `lists.${widgetDefinition.id}`)
  optionGroup.bindToModel(widgetDefinition)

  return builder.compile()
}
