const cardViewTracker = require('./../utils/card-view-tracker')
const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  // const parentCardView = cardViewTracker.getCurrentCardView()
  cardViewTracker.addCardView(definition.id)

  const { id, title } = definition

  const builder = new ComponentBuilder(definition)

  const dialogKey = `internals.dialogControl.${id}`

  const addBtn = builder.addTag('q-btn')
  addBtn.addAttribute('color', 'primary')
  addBtn.addAttribute('@click.native.stop', `createNewCardView('${id}')`)
  addBtn.addAttribute('label', title)

  const dialog = builder.addTag('q-dialog', { includeClosingTag: false })
  dialog.addAttribute('v-model', dialogKey)

  const body = dialog.addChildTag('div', { includeClosingTag: false })
  body.addAttribute('slot', 'body')

  return builder.compile()

  /*
  const heading = builder.addTag('div')
  heading.addAttribute('class', 'q-display-1 q-mt-lg') // grey--text text--darken-1
  heading.content(title)

  const desc = getAttribute('desc')
  if (desc) {
    const desc = builder.addTag('div')
    desc.addAttribute('class', 'q-subheading q-mt-md') // grey--text text--darken-1
    desc.content(getAttribute('desc'))
  }

  const list = builder.addTag('q-list')
  list.addAttribute(':no-border', true)
  list.addAttribute(':link', true)

  const arrayPath = parentSubView
    ? `internals.currentSubViewData.${parentSubView}.${widgetDefinition.id}`
    : `data.${widgetDefinition.id}`

  const item = list.addChildTag('q-item')
  item.addAttribute('v-for', `(item, $idx) in ${arrayPath}`)
  item.addAttribute(':key', '$idx')

  const itemSideIcon = item.addChildTag('q-item-side')
  itemSideIcon.addAttribute('icon', 'note')

  const itemMain = item.addChildTag('q-item-main')

  const label = itemMain.addChildTag('q-item-tile')
  label.addAttribute(':label', true)
  label.content(getAttribute('instanceHeadingTemplate'))

  const sublabel = itemMain.addChildTag('q-item-tile')
  sublabel.addAttribute(':sublabel', true)
  sublabel.content(getAttribute('instanceDescTemplate'))

  const itemSideAction = item.addChildTag('q-item-side')
  itemSideAction.addAttribute(':right', true)

  const itemSideActionBtn = itemSideAction.addChildTag('q-btn')
  itemSideActionBtn.addAttribute(':flat', true)
  itemSideActionBtn.addAttribute(':round', true)
  itemSideActionBtn.addAttribute(':dense', true)
  itemSideActionBtn.addAttribute('icon', 'delete_forever')
  itemSideActionBtn.addAttribute('@click', `removeSubViewContent('${widgetDefinition.id}', $idx)`)

  const addBtn = builder.addTag('q-btn')
  addBtn.addAttribute('color', 'primary')
  addBtn.addAttribute('@click.native.stop', `createNewSubView('${widgetDefinition.id}')`)
  addBtn.addAttribute('label', getAttribute('createButtonText') || 'Add')

  const dialog = builder.addTag('q-dialog', {includeClosingTag: false})
  dialog.addAttribute('v-model', dialogKey)

  const body = dialog.addChildTag('div', {includeClosingTag: false})
  body.addAttribute('slot', 'body')

  return builder.compile()
  */
}
