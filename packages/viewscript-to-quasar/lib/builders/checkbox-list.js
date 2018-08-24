const ComponentBuilder = require('./../utils/Component-builder').default
const GetAttribute = require('./../utils/Get-attribute').default

export default function checkboxList (widgetDefinition, options) {
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
