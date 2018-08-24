const ComponentBuilder = require('./../utils/Component-builder').default
// const GetAttribute = require('./../utils/Get-attribute')

export default function addressConverter (widgetDefinition, options) {
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
  pre.content('// TODO: Address widget!')
  return builder.compile()
}
