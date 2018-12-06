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
    // verticalContentAlignment,
    spacing
    // separator
  } = definition

  let card = '<q-card '

  if (definition.hasOwnProperty('showWhen')) card += ` v-if="${definition.showWhen}"`
  if (definition.hasOwnProperty('id')) card += ` id="${definition.id}"`

  // if (selectAction) card += ` @click=""`
  const classes = ['no-shadow']

  if (style === 'emphasis') classes.push('bg-light')

  if (spacing === 'padding') {
    classes.push('q-pa-md')
  } else if (MARGINS[spacing]) {
    classes.push(`q-mt-${MARGINS[spacing]}`)
  }

  if (classes.length > 0) card += `class="${classes.join(' ')}"`

  card += '> <q-card-main>'
  return card
}
