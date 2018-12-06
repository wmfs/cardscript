const ComponentBuilder = require('./../utils/Component-builder')

const COLORS = {
  accent: 'primary',
  good: 'positive',
  warning: 'warning',
  attention: 'negative',
  light: 'light',
  dark: 'dark'
}

module.exports = function (definition, options) {
  const {
    color,
    horizontalAlignment,
    // isSubtle,
    // maxLines,
    // size,
    text,
    // weight,
    // wrap,
    id
    // spacing,
    // separator
  } = definition

  const builder = new ComponentBuilder(definition)
  const div = builder.addTag('div')

  if (id) div.addAttribute('id', id)

  const classes = []

  if (['left', 'right', 'center'].includes(horizontalAlignment)) classes.push(`text-${horizontalAlignment}`)

  if (color && COLORS[color]) classes.push(`text-${COLORS[color]}`)

  if (classes.length > 0) div.addAttribute('class', classes.join(' '))

  div.content(text)
  return builder.compile()
}
