const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function headerConverter (widgetDefinition, options) {
  const builder = new ComponentBuilder(widgetDefinition)
  const getAttribute = GetAttribute(widgetDefinition)

  const jumbotron = builder.addTag('q-jumbotron')
  jumbotron.addAttribute(':dark', true)

  const backgroundImage = getAttribute('backgroundImage')

  if (backgroundImage) {
    const url = `url(statics/${backgroundImage})`
    const blackWash = 'linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5))'
    const whiteWash = 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5))'

    if (getAttribute('wash') === 'black') {
      jumbotron.addAttribute('style', `background-image: ${blackWash}, ${url};`)
    } else if (getAttribute('wash') === 'white') {
      jumbotron.addAttribute('style', `background-image: ${whiteWash}, ${url};`)
      jumbotron.addAttribute(':dark', false)
    } else {
      jumbotron.addAttribute('style', `background-image: ${url};`)
    }
  } else {
    jumbotron.addAttribute('class', 'bg-primary')
  }

  const heading = jumbotron.addChildTag('div')
  heading.addAttribute('class', 'q-display-3')
  heading.content(getAttribute('heading'))

  const subheading = jumbotron.addChildTag('div')
  subheading.addAttribute('class', 'q-subheading')
  subheading.content(getAttribute('desc'))

  return builder.compile()
}
