const ComponentBuilder = require('./../utils/Component-builder')

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

  if (horizontalAlignment === 'left') classes.push('text-left')
  if (horizontalAlignment === 'center') classes.push('text-center')
  if (horizontalAlignment === 'right') classes.push('text-right')

  if (color === 'primary') classes.push('text-primary')
  if (color === 'good') classes.push('text-positive')
  if (color === 'warning') classes.push('text-warning')
  if (color === 'attention') classes.push('text-negative')
  if (color === 'light') classes.push('text-light')
  if (color === 'dark') classes.push('text-dark')

  if (classes.length > 0) div.addAttribute('class', classes.join(' '))

  div.content(text)
  return builder.compile()
}
