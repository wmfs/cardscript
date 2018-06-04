const ComponentBuilder = require('./../utils/Component-builder')
// const GetAttribute = require('./../utils/Get-attribute')

module.exports = function currencyConverter (widgetDefinition, options) {
  // default
  // enabled
  // heading
  // help
  // mandatory
  // placeholder
/*
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const textField = builder.addTag('v-text-field')
  textField.addAttribute('id', widgetDefinition.id)
  textField.bindToModel(widgetDefinition)
  textField.addAttribute('name', widgetDefinition.id)
  textField.addAttribute('type', 'number')
  textField.addAttribute('prefix', '£')
  textField.addAttribute('label', getAttribute('heading'))
  textField.addAttribute('placeholder', getAttribute('placeholder'))
  textField.addAttribute('hint', getAttribute('desc'))
  return builder.compile()
  */
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: currency!')
  return builder.compile()
}
