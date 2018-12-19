const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const { phase } = definition

  const builder = new ComponentBuilder(definition)

  const div = builder.addTag('div')
  div.addAttribute('class', 'q-my-sm')

  const p = div.addChildTag('p')

  const strong = p.addChildTag('strong')
  strong.content(phase)
  strong.addAttribute('class', 'text-white bg-primary q-mr-md q-py-xs q-px-sm')

  const span = p.addChildTag('span')
  span.content('This is a new service – your feedback will help us to improve it.')

  return builder.compile()
}
