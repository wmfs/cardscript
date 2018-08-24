const ComponentBuilder = require('./../utils/Component-builder').default
const GetAttribute = require('./../utils/Get-attribute').default

export default function textareaConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const input = builder.addTag('q-input')
  input.bindToModel(widgetDefinition)
  input.addAttribute('type', 'textarea')
  input.addAttribute('float-label', getAttribute('heading'))
  input.addAttribute('class', 'q-ma-xl')
  return builder.compile()
}
