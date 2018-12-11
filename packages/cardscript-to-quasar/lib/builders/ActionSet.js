const MARGINS = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
  extraLarge: 'xl'
}

module.exports = function (definition, options) {
  const {
    spacing
  } = definition

  let btnGroup = '<q-btn-group'

  const classes = []

  if (spacing === 'padding') {
    classes.push(`q-pa-md`)
  } else if (spacing && MARGINS[spacing]) {
    classes.push(`q-mt-${MARGINS[spacing]}`)
  }

  if (classes.length > 0) btnGroup += ` class="${classes.join(' ')}"`

  return btnGroup + '>'
}
