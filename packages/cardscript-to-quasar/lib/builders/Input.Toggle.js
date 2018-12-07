const ComponentBuilder = require('./../utils/Component-builder')

const MARGINS = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
  extraLarge: 'xl'
}

module.exports = function (definition, options) {
  const {
    title,
    // valueOff,
    // valueOn,
    spacing
    // separator
  } = definition

  const builder = new ComponentBuilder(definition)

  const toggle = builder.addTag('q-toggle')
  toggle.bindToModel(definition)
  toggle.addAttribute('label', title)

  const classes = []

  if (spacing === 'padding') {
    classes.push('q-pa-md')
  } else if (MARGINS[spacing]) {
    classes.push(`q-mt-${MARGINS[spacing]}`)
  }

  if (classes.length > 0) toggle.addAttribute('class', classes.join(' '))

  return builder.compile()
}
