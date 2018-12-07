const MARGINS = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
  extraLarge: 'xl'
}

module.exports = function (definition, options) {
  const {
    backgroundImage,
    wash,
    // selectAction,
    style,
    // verticalContentAlignment,
    spacing,
    separator
  } = definition

  let card = '<q-card'

  if (definition.hasOwnProperty('showWhen')) card += ` v-if="${definition.showWhen}"`
  if (definition.hasOwnProperty('id')) card += ` id="${definition.id}"`

  // if (selectAction) card += ` @click=""`
  const classes = ['no-shadow']
  const styles = []

  if (separator) styles.push(`border-top: 1px solid rgb(238, 238, 238)`, `margin-top: 8px`, `padding-top: 8px`)

  if (style === 'emphasis') classes.push('bg-light')

  if (spacing === 'padding') {
    classes.push('q-pa-md')
  } else if (MARGINS[spacing]) {
    classes.push(`q-mt-${MARGINS[spacing]}`)
  }

  if (classes.length > 0) card += ` class="${classes.join(' ')}"`

  if (backgroundImage) {
    const url = `url(statics/${backgroundImage})`
    const blackWash = 'linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5))'
    const whiteWash = 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5))'

    if (wash === 'black') {
      styles.push(`background-image: ${blackWash}, ${url} !important`)
    } else if (wash === 'white') {
      styles.push(`background-image: ${whiteWash}, ${url} !important`)
    } else {
      styles.push(`background-image: ${url} !important`)
    }
  }

  if (styles.length > 0) card += ` style="${styles.join('; ')}"`

  card += '> <q-card-main>'

  return card
}
