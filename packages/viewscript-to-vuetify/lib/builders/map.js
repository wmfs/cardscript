const ComponentBuilder = require('./../utils/Component-builder')
// const GetAttribute = require('./../utils/Get-attribute')

module.exports = function mapConverter (widgetDefinition, options) {
  // collectGeometries
  // enableLocationassist
  // enabled
  // heading
  // help
  // mandatory
  // maxGeometries
  // minGeometries
  // pointIconPalette
  // relatedLayers

  // const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: Map widget!')
  return builder.compile()
}
