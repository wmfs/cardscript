const ComponentBuilder = require('./../utils/Component-builder').default
// const GetAttribute = require('./../utils/Get-attribute')

export default function signatureConverter (widgetDefinition, options) {
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
