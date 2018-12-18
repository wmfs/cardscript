// `border-top: 1px solid rgb(238, 238, 238)`, `margin-top: 8px`, `padding-top: 8px`

const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const builder = new ComponentBuilder(definition)

  const hr = builder.addTag('hr')
  hr.addAttribute('class', 'q-my-xl')

  return builder.compile()
}
