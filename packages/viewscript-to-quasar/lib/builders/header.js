const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function headerConverter (widgetDefinition, options) {
  const builder = new ComponentBuilder(widgetDefinition)
  const getAttribute = GetAttribute(widgetDefinition)

  const jumbotron = builder.addTag('q-jumbotron')
  jumbotron.addAttribute(':dark', true)

  const backgroundImage = getAttribute('backgroundImage')
  if (backgroundImage) {
    jumbotron.addAttribute('img-src', backgroundImage)
  }

  const heading = jumbotron.addChildTag('div')
  heading.addAttribute('class', 'q-display-3')
  heading.content(getAttribute('heading'))

  const subheading = jumbotron.addChildTag('div')
  subheading.addAttribute('class', 'q-subheading')
  subheading.content(getAttribute('desc'))

  return builder.compile()
}
