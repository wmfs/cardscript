const ComponentBuilder = require('./../utils/Component-builder')
// const GetAttribute = require('./../utils/Get-attribute')

module.exports = function signatureConverter (widgetDefinition, options) {
  // desc
  // enabled
  // heading
  // help
  // mandatory

  // const getAttribute = GetAttribute(widgetDefinition)
  /*
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: Signature widget!')
  return builder.compile()
  */
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: Signature widget!')
  return builder.compile()
}
