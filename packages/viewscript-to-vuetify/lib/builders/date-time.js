const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function dateTimeConverter (widgetDefinition, options) {
  // captureHistoric
  // desc
  // enabled
  // futuristicByAtMost
  // heading
  // help
  // historicByAtLeast
  // mandatory

  // const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: Date/Time widget!')
  return builder.compile()
}
