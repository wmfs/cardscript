const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function propertyListConverter (widgetDefinition, options) {
  // heading
  // properties
  // properties[0].dataPath
  // properties[0].header

  const builder = new ComponentBuilder(widgetDefinition)
  const getAttribute = GetAttribute(widgetDefinition)

  const list = builder.addTag('q-list')
  list.addAttribute('class', 'q-ma-xl')
  const header = list.addChildTag('q-list-header')
  header.content(getAttribute('heading'))

  const properties = getAttribute('properties')
  properties.forEach(prop => {
    const item = list.addChildTag('q-item')

    const leftSide = item.addChildTag('q-item-side')
    leftSide.addAttribute('icon', 'chevron_right')
    leftSide.addAttribute('inverted', null)
    leftSide.addAttribute('color', 'primary')

    const main = item.addChildTag('q-item-main')

    const label = main.addChildTag('q-item-tile')
    label.addAttribute('label', null)
    label.content(prop.header)

    const subLabel = main.addChildTag('q-item-tile')
    subLabel.addAttribute('sublabel', null)
    subLabel.content(`{{data.${prop.dataPath}}}`)
  })

  //
  // const layout = container.addChildTag('v-layout')
  // const flex = layout.addChildTag('v-flex')
  // const card = flex.addChildTag('v-card')
  // card.addAttribute('height', '100%')
  // const title = card.addChildTag('v-card-title')
  //
  // const h3 = title.addChildTag('h3')
  // h3.content(getAttribute('heading'))
  //
  // const div = card.addChildTag('div')
  // const table = div.addChildTag('table')
  // table.addAttribute('class', 'mx-1 mb-1')
  //
  // const properties = getAttribute('properties')
  // properties.forEach(
  //   function(prop) {
  //     const tr = table.addChildTag('tr')
  //     let labelTd = tr.addChildTag('td')
  //     labelTd.addAttribute('class', 'subheading pl-2 py-2 pr-3')
  //     labelTd.content(prop.header)
  //     let valueTd = tr.addChildTag('td')
  //     valueTd.content(`{{data.${prop.dataPath}}}`)
  //     valueTd.addAttribute('class', 'pa-2')
  //   }
  // )

  // pre.content(JSON.stringify(widgetDefinition,null,2))
  return builder.compile()
}
//
// v-card>
// <v-card-media src="/static/doc-images/cards/desert.jpg" height="200px">
//   </v-card-media>
//   <v-card-title primary-title>
// <div>
// <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
// <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
// </div>
// </v-card-title>
// <v-card-actions>
// <v-btn flat color="orange">Share</v-btn>
//   <v-btn flat color="orange">Explore</v-btn>
//   </v-card-actions>
//   </v-card>
