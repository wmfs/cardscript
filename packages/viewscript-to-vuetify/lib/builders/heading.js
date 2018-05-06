const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

// desc
// heading

module.exports = function headingConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const heading = builder.addTag('div')
  heading.addAttribute('class', 'display-2 grey--text text--darken-1 my-3')
  heading.content(getAttribute('heading'))

  const desc = getAttribute('desc')
  if (desc) {
    const descTag = builder.addTag('div')
    descTag.addAttribute('class', 'subheading grey--text text--darken-1 mb-3')
    descTag.content(desc)
  }

  return builder.compile()
}
