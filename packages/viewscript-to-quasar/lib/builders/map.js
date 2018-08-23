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
  const pre = builder.addTag('pre')
  pre.content('// TODO: Map widget!')
  // const map = builder.addTag('q-map')
  // const centreLatitudePath = getAttribute('centreLatitudePath')
  // const centreLongitudePath = getAttribute('centreLongitudePath')
  //
  // map.addAttribute(':centreLatitude', `data.${centreLatitudePath}`)
  // map.addAttribute(':centreLongitude', `data.${centreLongitudePath}`)

  return builder.compile()
}
