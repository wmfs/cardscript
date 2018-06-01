const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function textareaConverter (widgetDefinition, options) {
  // default
  // desc
  // enabled
  // heading
  // help
  // mandatory
  // maxCharacters
  // mincharacters
  // placeholder

  /*
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const textField = builder.addTag('v-text-field')
  textField.addAttribute('id', widgetDefinition.id)
  textField.bindToModel(widgetDefinition)
  textField.addAttribute('name', widgetDefinition.id)
  textField.addAttribute('label', getAttribute('heading'))
  textField.addAttribute('textarea', null)
  textField.addAttribute('placeholder', getAttribute('placeholder'))
  textField.addAttribute('hint', getAttribute('desc'))
  return builder.compile()
  */
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: text area!')
  return builder.compile()

}
