const cardViewTracker = require('./../utils/card-view-tracker')
const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const parentCardView = cardViewTracker.getCurrentCardView()
  cardViewTracker.addCardView(definition.id)

  const {
    id,
    title,
    instanceHeadingTemplate,
    instanceDescTemplate
  } = definition

  const builder = new ComponentBuilder(definition)

  const dialogKey = `internals.dialogControl.${id}`

  const arrayPath = parentCardView
    ? `internals.currentCardViewData.${parentCardView}.${id}`
    : `data.${id}`

  const list = builder.addTag('q-list')
  list.addAttribute(':no-border', true)
  list.addAttribute(':link', true)

  const item = list.addChildTag('q-item')
  item.addAttribute('v-for', `(item, $idx) in ${arrayPath}`)
  item.addAttribute(':key', '$idx')

  const itemSideIcon = item.addChildTag('q-item-side')
  itemSideIcon.addAttribute('icon', 'note')

  const itemMain = item.addChildTag('q-item-main')

  const label = itemMain.addChildTag('q-item-tile')
  label.addAttribute(':label', true)
  label.content(instanceHeadingTemplate || '')

  const sublabel = itemMain.addChildTag('q-item-tile')
  sublabel.addAttribute(':sublabel', true)
  sublabel.content(instanceDescTemplate || '')

  const itemSideAction = item.addChildTag('q-item-side')
  itemSideAction.addAttribute(':right', true)

  const itemSideActionBtn = itemSideAction.addChildTag('q-btn')
  itemSideActionBtn.addAttribute(':flat', true)
  itemSideActionBtn.addAttribute(':round', true)
  itemSideActionBtn.addAttribute(':dense', true)
  itemSideActionBtn.addAttribute('icon', 'delete_forever')
  itemSideActionBtn.addAttribute('@click', `removeCardViewContent('${id}', $idx)`)

  const btn = builder.addTag('q-btn')
  btn.addAttribute('color', 'primary')
  btn.addAttribute('@click.native.stop', `createNewCardView('${id}')`)
  btn.addAttribute('label', title)

  const dialog = builder.addTag('q-dialog', { includeClosingTag: false })
  dialog.addAttribute('v-model', dialogKey)

  const body = dialog.addChildTag('div', { includeClosingTag: false })
  body.addAttribute('slot', 'body')

  return builder.compile()
}
