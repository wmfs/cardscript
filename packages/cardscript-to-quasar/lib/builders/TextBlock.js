const ComponentBuilder = require('./../utils/Component-builder')

const COLORS = {
  accent: 'primary',
  good: 'positive',
  warning: 'warning',
  attention: 'negative',
  light: 'light',
  dark: 'dark'
}

const SIZES = {
  small: 16,
  medium: 18,
  large: 24,
  extraLarge: 32
}

const WEIGHTS = {
  lighter: 'light',
  bolder: 'bold'
}

const MARGINS = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
  extraLarge: 'xl'
}

module.exports = function (definition, options) {
  const {
    color,
    horizontalAlignment,
    isSubtle,
    // maxLines,
    size,
    text,
    weight,
    // wrap,
    id,
    spacing,
    separator
  } = definition

  const builder = new ComponentBuilder(definition)
  const div = builder.addTag('div')

  if (id) div.addAttribute('id', id)

  const classes = []
  const styles = []

  if (separator) styles.push(`border-top: 1px solid rgb(238, 238, 238)`, `margin-top: 8px`, `padding-top: 8px`)
  if (['left', 'right', 'center'].includes(horizontalAlignment)) classes.push(`text-${horizontalAlignment}`)
  if (color && COLORS[color]) classes.push(`text-${COLORS[color]}`)
  if (isSubtle) classes.push(`text-weight-light`)
  if (weight && WEIGHTS[weight]) classes.push(`text-weight-${WEIGHTS[weight]}`)

  if (spacing === 'padding') {
    classes.push(`q-pa-md`)
  } else if (spacing && MARGINS[spacing]) {
    classes.push(`q-mt-${MARGINS[spacing]}`)
  }

  if (size && SIZES[size]) styles.push(`font-size: ${SIZES[size]}px`)

  if (styles.length > 0) div.addAttribute('style', styles.join('; '))
  if (classes.length > 0) div.addAttribute('class', classes.join(' '))

  div.content(text)
  return builder.compile()
}
