const subViewTracker = require('./../utils/sub-view-tracker')
const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function endSubView (widgetDefinition, options) {
  let template = '</v-card-main>'

  const builder = new ComponentBuilder(widgetDefinition)

  const actions = builder.addTag('q-card-actions')

  const subViewId = subViewTracker.removeSubView()

  const close = actions.addChildTag('q-btn')
  close.addAttribute(':flat', true)
  close.addAttribute('@click.native', `internals.dialogControl.${subViewId} = false`)
  close.content('Close')

  const save = actions.addChildTag('q-btn')
  save.addAttribute(':flat', true)
  save.addAttribute('@click.native', `pushSubViewContent('${subViewId}')`)
  save.content('Save')

  template += builder.compile()
  template += '</q-card></q-dialog>'
  return template
}
