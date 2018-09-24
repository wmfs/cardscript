const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function dateConverter (widgetDefinition, options) {
  // captureHistoric
  // desc
  // enabled
  // futuristicByAtMost
  // heading
  // help
  // historicByAtLeast
  // mandatory

  /*
  const getAttribute = GetAttribute(widgetDefinition)
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
  menu.addAttribute('min-width', '290px')

  const text = menu.addChildTag('v-text-field')
  text.addAttribute('slot', 'activator')
  text.bindToModel(widgetDefinition)
  text.addAttribute('label', getAttribute('heading'))
  text.addAttribute('prepend-icon', 'event')
  text.addAttribute('readonly', null)

  const picker = menu.addChildTag('v-date-picker')
  picker.bindToModel(widgetDefinition)
  picker.addAttribute('no-title', null)
  picker.addAttribute('scrollable', null)
  picker.addChildTag('v-spacer')

  const cancel = picker.addChildTag('v-btn')
  cancel.addAttribute('flat', null)
  cancel.addAttribute('color', 'primary')
  cancel.addAttribute('@click', `${menuId} = false`)
  cancel.content('Cancel')

  const ok = picker.addChildTag('v-btn')
  ok.addAttribute('flat', null)
  ok.addAttribute('color', 'primary')
  ok.addAttribute('@click', `$refs.${menuId}.save(data.${widgetDefinition.id})`)
  ok.content('OK')

  return builder.compile()
  */
  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const field = builder.addTag('q-field')
  field.addAttribute(':error', `$v.data.${widgetDefinition.id} && $v.data.${widgetDefinition.id}.$error`)
  const dateTime = field.addChildTag('q-datetime')
  dateTime.bindToModel(widgetDefinition)
  dateTime.addAttribute('type', 'date')
  dateTime.addAttribute('float-label', getAttribute('heading'))
  dateTime.addAttribute('class', 'q-ma-xl')
  return builder.compile()
}
