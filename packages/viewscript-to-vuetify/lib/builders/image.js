const ComponentBuilder = require('./../utils/Component-builder')
// const GetAttribute = require('./../utils/Get-attribute')

module.exports = function imageConverter (widgetDefinition, options) {
  // altText
  // desc
  // heading
  // help
  // image
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: Image widget!')
  return builder.compile()
}
