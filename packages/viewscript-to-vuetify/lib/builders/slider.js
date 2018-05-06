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

  const getAttribute = GetAttribute(widgetDefinition)
  const builder = new ComponentBuilder(widgetDefinition)
  const container = builder.addTag('v-container')
  container.addAttribute('fluid', null)
  container.addAttribute('grid-list-md', null)

  const layout = container.addChildTag('v-layout')
  layout.addAttribute('row', null)
  layout.addAttribute('wrap', null)
  const flex1 = layout.addChildTag('v-flex')
  flex1.addAttribute('xs10', null)

  const slider = flex1.addChildTag('v-slider')
  slider.bindToModel(widgetDefinition)
  slider.addAttribute(':min', getAttribute('minimum'))
  slider.addAttribute(':max', getAttribute('maximum'))
  slider.addAttribute(':step', getAttribute('step'))
  slider.addAttribute('label', getAttribute('heading'))
  slider.addAttribute('hint', getAttribute('desc'))

  const flex2 = layout.addChildTag('v-flex')
  flex2.addAttribute('xs2', null)
  const text = flex2.addChildTag('v-text-field')
  text.bindToModel(widgetDefinition)
  text.addAttribute('type', 'number')
  return builder.compile()
}
