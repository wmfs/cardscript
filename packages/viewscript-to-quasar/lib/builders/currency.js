const ComponentBuilder = require('./../utils/Component-builder').default
const GetAttribute = require('./../utils/Get-attribute').default

export default function currencyConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const input = builder.addTag('q-input')
  input.bindToModel(widgetDefinition)
  input.addAttribute('type', 'number')
  input.addAttribute('prefix', '£')
  input.addAttribute('stack-label', getAttribute('heading'))
  // textField.addAttribute('placeholder', getAttribute('placeholder'))
  // textField.addAttribute('hint', getAttribute('desc'))
  input.addAttribute('class', 'q-ma-xl')
  return builder.compile()
}
