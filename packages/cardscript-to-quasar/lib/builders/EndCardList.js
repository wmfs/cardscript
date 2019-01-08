const cardListTracker = require('./../utils/card-list-tracker')
const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const { editable } = definition

  let template = '</div>'

  const builder = new ComponentBuilder(definition)

  const cardListId = cardListTracker.removeCardList()

  if (editable) {
    const actions = builder.addTag('template')
    actions.addAttribute('slot', 'buttons')
    actions.addAttribute('slot-scope', 'props')

    const close = actions.addChildTag('q-btn')
    close.addAttribute(':flat', true)
    close.addAttribute('@click.native', `internals.dialogControl.${cardListId} = false`)
    close.content('Close')

    const save = actions.addChildTag('q-btn')
    save.addAttribute(':flat', true)
    save.addAttribute('@click.native', `pushCardListContent('${cardListId}')`)
    save.content('Save')
  }

  template += builder.compile()
  template += '</q-dialog>'
  return template
}
