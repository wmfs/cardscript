const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function switchConverter (widgetDefinition, options) {
  // default
  // desc
  // enabled
  // heading
  // help
  // mandatory

//
// <p class="caption">With label</p>
//   <q-toggle v-model="check2" color="secondary" label="Tick me" />

  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const toggle = builder.addTag('q-toggle')
  toggle.addAttribute('label', getAttribute('heading'))
  toggle.addAttribute('class', 'q-ma-xl')
  toggle.addAttribute('checked-icon', 'done')
  toggle.addAttribute('unchecked-icon', 'close')
  toggle.bindToModel(widgetDefinition)
  return builder.compile()
}
