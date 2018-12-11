const ComponentBuilder = require('./../utils/Component-builder')
const { inspect } = require('util')

module.exports = function (definition, options) {
  const {
    title,
    // iconUrl
    data
  } = definition

  const builder = new ComponentBuilder(definition)

  const button = builder.addTag('q-btn')
  button.addAttribute('label', title)
  button.addAttribute('color', 'primary')
  button.addAttribute('@click', `action('Submit', ${inspect(data || {})} )`)

  return builder.compile()
}
