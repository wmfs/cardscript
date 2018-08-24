const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

// desc
// heading

module.exports = function headingConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const heading = builder.addTag('p')
  heading.addAttribute('class', 'q-display-2 q-ma-lg')
  heading.content(getAttribute('heading'))

  const desc = getAttribute('desc')
  if (desc) {
    const descTag = builder.addTag('p')
    descTag.addAttribute('class', 'q-subheading')
    descTag.content(desc)
  }

  return builder.compile()
}
