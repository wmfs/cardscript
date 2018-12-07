const MARGINS = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
  extraLarge: 'xl'
}

module.exports = function (definition, options) {
  const {
    // selectAction,
    style,
    // width, // auto, stretch, <number>
    id,
    spacing,
    separator,
    showWhen
  } = definition

  const classes = ['col']
  const styles = []

  if (separator) styles.push(`border-left: 1px solid rgb(238, 238, 238)`, `margin-left: 8px`, `padding-left: 8px`)
  if (style === 'emphasis') classes.push('bg-light')
  if (spacing === 'padding') {
    classes.push('q-pa-md')
  } else if (MARGINS[spacing]) {
    classes.push(`q-mt-${MARGINS[spacing]}`)
  }

  let div = `<div class="${classes.join(' ')}"`
  if (styles.length > 0) div += ` style="${styles.join('; ')}"`

  if (showWhen) div += ` v-if="${showWhen}"`
  if (id) div += ` id="${id}"`

  div += '>'
  return div
}
