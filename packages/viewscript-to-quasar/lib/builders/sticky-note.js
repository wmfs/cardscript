const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function stickyNoteConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)
  // desc
  // heading
  // style

  // TODO: Should align this, really?
  // Viewscript   Quasar styles
  // ----------   --------------
  //              success
  // normal       info
  // informative  info
  //              warning
  // danger       error
  let viewscriptStyle = getAttribute('style')
  let color
  if (viewscriptStyle === 'danger') {
    color = 'error'
  } else {
    color = 'primary'
  }

  const builder = new ComponentBuilder(widgetDefinition)
  const alert = builder.addTag('q-alert')
  alert.addAttribute('class', 'q-ma-xl')
  alert.addAttribute('color', color)

  alert.addAttribute('message', getAttribute('heading'))
  alert.addAttribute('detail', getAttribute('desc'))
  return builder.compile()
}
