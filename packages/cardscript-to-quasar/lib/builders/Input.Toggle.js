const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const {
    title
    // valueOff,
    // valueOn,
    // spacing,
    // separator
  } = definition

  const builder = new ComponentBuilder(definition)

  const toggle = builder.addTag('q-toggle')
  toggle.bindToModel(definition)
  toggle.addAttribute('label', title)

  return builder.compile()
}
