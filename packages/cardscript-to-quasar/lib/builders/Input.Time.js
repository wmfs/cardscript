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
    spacing,
    separator
  } = definition

  const builder = new ComponentBuilder(definition)
  const date = builder.addTag('q-datetime')
  date.bindToModel(definition)
  date.addAttribute('type', 'time')
  if (placeholder) date.addAttribute('placeholder', placeholder)

  const classes = []
  const styles = []

  if (separator) styles.push(`border-top: 1px solid rgb(238, 238, 238)`, `margin-top: 8px`, `padding-top: 8px`)

  if (spacing === 'padding') {
    classes.push('q-pa-md')
  } else if (MARGINS[spacing]) {
    classes.push(`q-mt-${MARGINS[spacing]}`)
  }

  if (classes.length > 0) date.addAttribute('class', classes.join(' '))
  if (styles.length > 0) date.addAttribute('style', styles.join('; '))

  return builder.compile()
}
