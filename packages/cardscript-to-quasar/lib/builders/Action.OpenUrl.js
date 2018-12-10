const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const {
    title,
    // iconUrl
    url
  } = definition

  const builder = new ComponentBuilder(definition)

  const button = builder.addTag('q-btn')
  button.addAttribute('label', title)
  button.addAttribute('@click', `openURL('${url}')`)

  return builder.compile()
}
