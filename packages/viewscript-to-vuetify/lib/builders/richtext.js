const ComponentBuilder = require('./../utils/Component-builder')
// const GetAttribute = require('./../utils/Get-attribute')

module.exports = function richtextConverter (widgetDefinition, options) {
  // default
  // desc
  // enabled
  // heading
  // help
  // mandatory

  // const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: Richtext widget!')
  return builder.compile()
}
