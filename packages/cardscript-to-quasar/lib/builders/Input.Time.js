const ComponentBuilder = require('./../utils/Component-builder')

const MARGINS = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
  extraLarge: 'xl'
}

module.exports = function (definition, options) {
  const {
    // max,
    // min,
    placeholder,
    spacing
    // separator
  } = definition

  const builder = new ComponentBuilder(definition)
  const date = builder.addTag('q-datetime')
  date.bindToModel(definition)
  date.addAttribute('type', 'time')
  if (placeholder) date.addAttribute('placeholder', placeholder)

  const classes = []

  if (spacing === 'padding') {
    classes.push('q-pa-md')
  } else if (MARGINS[spacing]) {
    classes.push(`q-mt-${MARGINS[spacing]}`)
  }

  if (classes.length > 0) date.addAttribute('class', classes.join(' '))

  return builder.compile()
}
