const ComponentBuilder = require('./../utils/Component-builder').default

export default function horizontalLineConverter (widgetDefinition, options) {
  const builder = new ComponentBuilder(widgetDefinition)
  const heading = builder.addTag('hr')
  heading.addAttribute('class', 'q-my-xl')
  return builder.compile()
}
