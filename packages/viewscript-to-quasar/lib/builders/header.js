const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

// backgroundImage
// backgroundImageAltText
// desc
// heading

module.exports = function headerConverter (widgetDefinition, options) {

  const builder = new ComponentBuilder(widgetDefinition)
  const getAttribute = GetAttribute(widgetDefinition)


  let src
  const backgroundImage = getAttribute('backgroundImage')
  if (backgroundImage) {
    src = 'https://tymly-api.wmfs.net/images/'
    // TODO: REMOVE THIS, JUST FOR A DEMO!
    if (backgroundImage.substring(0,5) !== 'wmfs/') {
      src += 'wmfs/'
    }
    src += backgroundImage
    // jumbotron.addAttribute('src', src)
  } else {
    // jumbotron.addAttribute('color', 'primary')
  }

  const card = builder.addTag('q-card')
  card.addAttribute('inline', null)
  card.addAttribute('flat', null)
  card.addAttribute('style', 'width:100%;')

  const media = card.addChildTag('q-card-media')
  const img = media.addChildTag('img')
  img.addAttribute('src', src)

  const title = media.addChildTag('q-card-title')
  title.addAttribute('slot', 'overlay')
  title.content( getAttribute('heading') )

  const span = title.addChildTag('span')
  span.addAttribute('slot', 'subtitle')
  span.content( getAttribute('desc') )
/*
<q-card inline class="q-ma-sm">
    <q-card-media overlay-position="full">
    <img src="statics/parallax2.jpg">

    <q-card-title slot="overlay">
    Title
    <span slot="subtitle">Subtitle</span>
    </q-card-title>
    </q-card-media>
    </q-card>
  */




  //
  // jumbotron.addAttribute('dark', null)
  //
  //
  // const container = jumbotron.addChildTag('v-container')
  // container.addAttribute('fill-height', null)
  //
  // const layout = container.addChildTag('v-layout')
  // layout.addAttribute('align-center', null)
  //
  // const flex = layout.addChildTag('v-flex')
  // flex.addAttribute('text-xs-center', null)
  //
  // const h3 = flex.addChildTag('h3')
  // h3.addAttribute('class', 'display-3')
  // h3.content(getAttribute('heading'))
  //
  // const desc = getAttribute('desc')
  // if (desc) {
  //   const div = flex.addChildTag('div')
  //   div.content(desc)
  // }

  return builder.compile()

}
