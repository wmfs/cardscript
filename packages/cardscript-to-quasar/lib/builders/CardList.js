// todo: title, header, guidance

const cardListTracker = require('./../utils/card-list-tracker')
const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const parentCardList = cardListTracker.getCurrentCardList()
  cardListTracker.addCardList(definition.id)

  const {
    id,
    addButtonLabel,
    editable,
    instanceTitleTemplate,
    instanceSubtitleTemplate
  } = definition

  const builder = new ComponentBuilder(definition)

  const dialogKey = `internals.dialogControl.${id}`

  if (editable) {
    const arrayPath = parentCardList
      ? `internals.currentCardListData.${parentCardList}.${id}`
      : `data.${id}`

    if (instanceTitleTemplate) {
      const list = builder.addTag('q-list')
      list.addAttribute(':no-border', true)
      list.addAttribute(':link', true)
      list.addAttribute('v-if', `${arrayPath} && ${arrayPath}.length > 0`)

      const item = list.addChildTag('q-item')
      item.addAttribute('v-for', `(item, $idx) in ${arrayPath}`)
      item.addAttribute(':key', '$idx')

      const itemSideIcon = item.addChildTag('q-item-side')
      itemSideIcon.addAttribute('icon', 'note')

      const itemMain = item.addChildTag('q-item-main')

      const label = itemMain.addChildTag('q-item-tile')
      label.addAttribute(':label', true)
      label.content(instanceTitleTemplate || '')

      if (instanceSubtitleTemplate) {
        const sublabel = itemMain.addChildTag('q-item-tile')
        sublabel.addAttribute(':sublabel', true)
        sublabel.content(instanceSubtitleTemplate || '')
      }

      const itemSideAction = item.addChildTag('q-item-side')
      itemSideAction.addAttribute(':right', true)

      const itemSideActionBtn = itemSideAction.addChildTag('q-btn')
      itemSideActionBtn.addAttribute(':flat', true)
      itemSideActionBtn.addAttribute(':round', true)
      itemSideActionBtn.addAttribute(':dense', true)
      itemSideActionBtn.addAttribute('icon', 'delete_forever')
      itemSideActionBtn.addAttribute('@click', `removeCardListContent('${id}', $idx)`)
    }
  }

  const btn = builder.addTag('q-btn')
  btn.addAttribute('color', 'primary')
  btn.addAttribute('@click.native.stop', `createNewCardList('${id}')`)
  btn.addAttribute('label', addButtonLabel || 'Open Modal')

  const dialog = builder.addTag('q-dialog', { includeClosingTag: false })
  dialog.addAttribute('v-model', dialogKey)

  const body = dialog.addChildTag('div', { includeClosingTag: false })
  body.addAttribute('slot', 'body')

  return builder.compile()
}
