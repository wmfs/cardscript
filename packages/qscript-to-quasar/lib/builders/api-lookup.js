const ComponentBuilder = require('./../utils/Component-builder')
// const GetAttribute = require('./../utils/Get-attribute')

module.exports = function apiLookupConverter (widgetDefinition, options) {
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
