const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const {
    min,
    max,
    step
  } = definition

  const builder = new ComponentBuilder(definition)

  const slider = builder.addTag('q-slider')
  slider.bindToModel(definition)
  slider.addAttribute(':label-always', true)

  if (min || min === 0) slider.addAttribute(':min', min)
  if (max || max === 0) slider.addAttribute(':max', max)
  if (step) slider.addAttribute(':step', step)

  return builder.compile()
}

// <q-slider v-model="label" :min="-20" :max="20" :step="4" label-always color="orange" />
