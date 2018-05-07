const subViewTracker = require('./../utils/sub-view-tracker')
const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

// desc
// heading
// help
// maxAllowed
// minAllowed
// pluralEntityText
// showAtLeastOne
// singularEntityText

module.exports = function subViewConverter (widgetDefinition, options) {
  subViewTracker.addSubView(widgetDefinition.id)
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)

  const heading = builder.addTag('div')
  heading.addAttribute('class', 'display-1 grey--text text--darken-1 mt-4')
  heading.content(getAttribute('heading'))

  const desc = getAttribute('desc')
  if (desc) {
    const desc = builder.addTag('div')
    desc.addAttribute('class', 'subheading grey--text text--darken-1 mb-2')
    desc.content(getAttribute('desc'))
  }

  const dialog = builder.addTag(
    'v-dialog',
    {
      includeClosingTag: false
    }
  )
  dialog.addAttribute('v-model', `data.$${widgetDefinition.id}_modal`)
  dialog.addAttribute('persistent', null)
  dialog.addAttribute('max-width', '600px')

  const button = dialog.addChildTag('v-btn')
  button.addAttribute('slot', 'activator')
  button.addAttribute('color', 'primary')
  button.addAttribute('dark', null)

  button.content(getAttribute('createButtonText') || 'Add')

  const card = dialog.addChildTag('v-card', {includeClosingTag: false})

  const cardText = card.addChildTag('v-card-text', {includeClosingTag: false})
  const container = cardText.addChildTag('v-container', {includeClosingTag: false})
  container.addAttribute('grid-list-md', null)

  const layout = container.addChildTag('v-layout', {includeClosingTag: false})
  layout.addAttribute('wrap', null)

  const flex = layout.addChildTag('v-flex', {includeClosingTag: false})
  flex.addAttribute('xs12', null)
  flex.addAttribute('sm12', null)
  flex.addAttribute('md10', null)
  flex.addAttribute('lg10', null)
  flex.addAttribute('xl10', null)
  return builder.compile()
}
