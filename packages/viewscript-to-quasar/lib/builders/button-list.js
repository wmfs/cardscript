const ComponentBuilder = require('./../utils/Component-builder')
// const GetAttribute = require('./../utils/Get-attribute')

module.exports = function buttonListConverter (widgetDefinition, options) {
  // enableLocationAssist
  // enableUnknownOption
  // enabled
  // heading
  // help
  // labelPath
  // mandatory
  // numericValue
  // resultLimit

  // const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: Button List widget!')
  return builder.compile()
}
