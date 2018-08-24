const ComponentBuilder = require('./../utils/Component-builder').default
const GetAttribute = require('./../utils/Get-attribute').default

export default function switchConverter (widgetDefinition, options) {
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
  toggle.bindToModel(widgetDefinition)
  return builder.compile()
}
