const ComponentBuilder = require('./../utils/Component-builder').default
// const GetAttribute = require('./../utils/Get-attribute')

export default function imageConverter (widgetDefinition, options) {
  // altText
  // desc
  // heading
  // help
  // image
  /*
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: Image widget!')
  return builder.compile()
  */
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: image widget!')
  return builder.compile()
}
