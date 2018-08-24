const ComponentBuilder = require('./../utils/Component-builder').default
const GetAttribute = require('./../utils/Get-attribute').default

// default
// desc
// enabled
// heading
// help
// mandatory
// maxCharacters
// minCharacters
// placeholder

export default function textConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const textField = builder.addTag('q-input')
  textField.addAttribute('id', widgetDefinition.id)
  textField.bindToModel(widgetDefinition)
  textField.addAttribute('class', 'q-ma-xl')
  textField.addAttribute('float-label', getAttribute('heading'))
  // textField.addAttribute(':dark', 'dark')
  return builder.compile()
}
