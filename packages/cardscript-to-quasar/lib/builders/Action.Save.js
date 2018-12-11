const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const {
    title
    // iconUrl
  } = definition

  const builder = new ComponentBuilder(definition)

  const button = builder.addTag('q-btn')
  button.addAttribute('label', title)
  button.addAttribute('color', 'primary')

  return builder.compile()
}
