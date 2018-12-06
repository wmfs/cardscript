const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const {
    title
    // iconUrl
    // data
  } = definition
  const builder = new ComponentBuilder(definition)
  const button = builder.addTag('q-btn')
  button.addAttribute('label', title)
  return builder.compile()
}
