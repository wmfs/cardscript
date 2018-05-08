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

  const dialogKey = `internals.dialogControl.${widgetDefinition.id}`

  const heading = builder.addTag('div')
  heading.addAttribute('class', 'display-1 grey--text text--darken-1 mt-4')
  heading.content(getAttribute('heading'))

  const desc = getAttribute('desc')
  if (desc) {
    const desc = builder.addTag('div')
    desc.addAttribute('class', 'subheading grey--text text--darken-1 mb-2')
    desc.content(getAttribute('desc'))
  }

  const list = builder.addTag('v-list')
  list.addAttribute('two-line', null)
  list.addAttribute('subheader', null)

  const tile = list.addChildTag('v-list-tile')

  tile.addAttribute('v-for', `(item, $idx) in data.${widgetDefinition.id}`)
  tile.addAttribute('avatar', null)
  tile.addAttribute('@click', '')

  const avatar = tile.addChildTag('v-list-tile-avatar')
  const icon = avatar.addChildTag('v-icon')
  icon.content('note')

  const tileContent = tile.addChildTag('v-list-tile-content')
  const tileTitle = tileContent.addChildTag('v-list-tile-title')
  tileTitle.content('I will be a title')
  const tileSubTitle = tileContent.addChildTag('v-list-tile-sub-title')
  tileSubTitle.content('And I shall be some content')

  const tileAction = tile.addChildTag('v-list-tile-action')
  const actionButton = tileAction.addChildTag('v-btn')
  actionButton.addAttribute('icon', null)
  actionButton.addAttribute('ripple', null)
  actionButton.addAttribute('@click', `removeSubViewContent('${widgetDefinition.id}', $idx)`)

  const actionIcon = actionButton.addChildTag('v-icon')
  actionIcon.addAttribute('color', 'grey lighten-1')
  actionIcon.content('delete_forever')

  const button = builder.addTag('v-btn')
  button.addAttribute('color', 'primary')
  button.addAttribute('@click.native.stop', `createNewSubView('${widgetDefinition.id}')`)
  button.addAttribute('dark', null)
  button.content(getAttribute('createButtonText') || 'Add')

  const dialog = builder.addTag(
    'v-dialog',
    {
      includeClosingTag: false
    }
  )
  dialog.addAttribute('v-model', dialogKey)
  dialog.addAttribute('max-width', '600px')

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
