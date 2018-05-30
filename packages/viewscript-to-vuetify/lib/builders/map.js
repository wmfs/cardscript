const ComponentBuilder = require('./../utils/Component-builder')
// const GetAttribute = require('./../utils/Get-attribute')

module.exports = function mapConverter (widgetDefinition, options) {
  // collectGeometries
  // enableLocationAssist
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
  builder.addTag('ty-map')
  return builder.compile()
}
