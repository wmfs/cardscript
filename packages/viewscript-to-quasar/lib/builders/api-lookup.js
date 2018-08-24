const ComponentBuilder = require('./../utils/Component-builder').default
// const GetAttribute = require('./../utils/Get-attribute')

export default function apiLookupConverter (widgetDefinition, options) {
  // apiName
  // enabled
  // heading
  // help
  // labelPath
  // mandatory
  // numericValue
  // params
  // resultLimit

  // const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: API Lookup widget!')
  return builder.compile()
}
