const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

// backgroundImage
// backgroundImageAltText
// desc
// heading

module.exports = function headerConverter (widgetDefinition, options) {
  const builder = new ComponentBuilder(widgetDefinition)
  const getAttribute = GetAttribute(widgetDefinition)

  const jumbotron = builder.addTag('v-jumbotron')

  const backgroundImage = getAttribute('backgroundImage')
  if (backgroundImage) {
    let src = 'https://tymly-api.wmfs.net/images/'
    // TODO: REMOVE THIS, JUST FOR A DEMO!
    if (backgroundImage.substring(0, 5) !== 'wmfs/') {
      src += 'wmfs/'
    }
    src += backgroundImage
    jumbotron.addAttribute('src', src)
  } else {
    jumbotron.addAttribute('color', 'primary')
  }

  jumbotron.addAttribute('dark', null)

  const container = jumbotron.addChildTag('v-container')
  container.addAttribute('fill-height', null)

  const layout = container.addChildTag('v-layout')
  layout.addAttribute('align-center', null)

  const flex = layout.addChildTag('v-flex')
  flex.addAttribute('text-xs-center', null)

  const h3 = flex.addChildTag('h3')
  h3.addAttribute('class', 'display-3')
  h3.content(getAttribute('heading'))

  const desc = getAttribute('desc')
  if (desc) {
    const div = flex.addChildTag('div')
    div.content(desc)
  }

  return builder.compile()
}
