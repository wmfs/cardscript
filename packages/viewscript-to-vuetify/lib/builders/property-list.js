const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function propertyListConverter (widgetDefinition, options) {
  // heading
  // dataPath
  // columns
  // columns[0].dataPath
  // columns[0].header

  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: Property List widget!')
  return builder.compile()
}
