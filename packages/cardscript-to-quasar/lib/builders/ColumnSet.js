const MARGINS = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
  extraLarge: 'xl'
}

module.exports = function (definition, options) {
  const {
    separator,
    spacing
  } = definition

  let div = '<div'

  const classes = ['row']
  const styles = []

  if (separator) styles.push('border-top: 1px solid rgb(238, 238, 238)', 'margin-top: 8px', 'padding-top: 8px')

  if (spacing === 'padding') {
    classes.push(`q-pa-md`)
  } else if (spacing && MARGINS[spacing]) {
    classes.push(`q-mt-${MARGINS[spacing]}`)
  }

  if (classes.length > 0) div += ` class="${classes.join(' ')}"`
  if (styles.length > 0) div += ` style="${styles.join('; ')}"`

  return `${div}>`
}
