const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function stickyNoteConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  // desc
  // heading
  // style

  // TODO: Should align this, really?
  // Viewscript   Vuetify styles
  // ----------   --------------
  //              success
  // normal       info
  // informative  info
  //              warning
  // danger       error

  let viewscriptStyle = getAttribute('style')
  let vuetifyAlertType
  if (viewscriptStyle === 'danger') {
    vuetifyAlertType = 'error'
  } else {
    vuetifyAlertType = 'info'
  }

  const builder = new ComponentBuilder(widgetDefinition)
  const alert = builder.addTag('v-alert')

  alert.addAttribute(':value', 'true')
  alert.addAttribute('type', vuetifyAlertType)

  const parts = []
  const heading = getAttribute('heading')
  if (heading) {
    parts.push(heading)
  }
  const desc = getAttribute('desc')
  if (desc) {
    parts.push(desc)
  }

  alert.content(parts.join('\n'))

  return builder.compile()
}
