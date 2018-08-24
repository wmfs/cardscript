const ComponentBuilder = require('./../utils/Component-builder')
const GetAttribute = require('./../utils/Get-attribute')

module.exports = function sliderConverter (widgetDefinition, options) {
  // default
  // desc
  // enabled
  // heading
  // help
  // mandatory
  // maximum
  // minimum
  // step

// <q-slider
//   v-model="selectedValue"
// :min="0"
// :max="10"
// :step="2"
//   label
//   snap
//   />

  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)

  const caption = builder.addTag('p')
  caption.addAttribute('class', 'q-ml-xl caption')
  caption.content(getAttribute('heading'))

  const div = builder.addTag('div')
  div.addAttribute('class', 'q-ma-xl')

  const slider = div.addChildTag('q-slider')
  slider.bindToModel(widgetDefinition)
  slider.addAttribute(':min', getAttribute('minimum'))
  slider.addAttribute(':max', getAttribute('maximum'))
  slider.addAttribute(':step', getAttribute('step'))
  return builder.compile()
}
