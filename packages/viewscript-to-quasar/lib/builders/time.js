const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function timeConverter (widgetDefinition, options) {
  const getAttribute = GetAttribute(widgetDefinition)

  // enabled
  // heading
  // help
  // mandatory

  /*
  const builder = new ComponentBuilder(widgetDefinition)
  const menu = builder.addTag('v-menu')
  const menuId = `${widgetDefinition.id}_menu`
  menu.addAttribute('ref', menuId)
  menu.addAttribute(':close-on-content-click', 'false')
  menu.addAttribute('v-model', `data.${menuId}`)
  menu.addAttribute(':nudge-right', '40')
  menu.addAttribute(':return-value.sync', `data.${widgetDefinition.id}`)
  menu.addAttribute('lazy', null)
  menu.addAttribute('transition', 'scale-transition')
  menu.addAttribute('offset-y', null)
  menu.addAttribute('full-width', null)
  menu.addAttribute('max-width', '290px')
  menu.addAttribute('min-width', '290px')

  const text = menu.addChildTag('v-text-field')
  text.addAttribute('slot', 'activator')
  text.bindToModel(widgetDefinition)
  text.addAttribute('label', getAttribute('heading'))
  text.addAttribute('prepend-icon', 'access_time')
  text.addAttribute('readonly', null)

  const picker = menu.addChildTag('v-time-picker')
  picker.bindToModel(widgetDefinition)
  picker.addAttribute('@change', `$refs.${menuId}.save(data.${widgetDefinition.id})`)
  return builder.compile()
  */
  const builder = new ComponentBuilder(widgetDefinition)
  const pre = builder.addTag('pre')
  pre.content('// TODO: Time widget!')
  return builder.compile()

}
