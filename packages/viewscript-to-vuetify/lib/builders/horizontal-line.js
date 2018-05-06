const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function horizontalLineConverter (widgetDefinition, options) {
  const builder = new ComponentBuilder(widgetDefinition)
  const heading = builder.addTag('hr')
  heading.addAttribute('class', 'my-5')
  return builder.compile()
}
