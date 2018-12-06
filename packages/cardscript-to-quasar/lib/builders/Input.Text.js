const ComponentBuilder = require('./../utils/Component-builder')

const MARGINS = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
  extraLarge: 'xl'
}

module.exports = function (definition, options) {
  const {
    isMultiline,
    maxLength,
    placeholder,
    // style, // text, tel, url, email
    spacing
    // separator
  } = definition

  const builder = new ComponentBuilder(definition)

  const input = builder.addTag('q-input')
  input.bindToModel(definition)

  if (placeholder) input.addAttribute('placeholder', placeholder)
  if (maxLength) input.addAttribute('maxLength', maxLength)
  if (isMultiline) input.addAttribute('type', 'textarea')

  const classes = []

  if (spacing === 'padding') {
    classes.push('q-pa-md')
  } else if (MARGINS[spacing]) {
    classes.push(`q-mt-${MARGINS[spacing]}`)
  }

  input.addAttribute('class', classes.join(' '))

  return builder.compile()
}
