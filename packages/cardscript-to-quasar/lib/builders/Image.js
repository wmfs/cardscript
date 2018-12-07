const ComponentBuilder = require('./../utils/Component-builder')

const SIZES = {
  auto: '100%',
  stretch: '100%',
  small: '40px',
  medium: '80px',
  large: '120px'
}

const MARGINS = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
  extraLarge: 'xl'
}

module.exports = function (definition, options) {
  const {
    altText,
    horizontalAlignment,
    // selectAction,
    size,
    style,
    url,
    spacing
    // separator
  } = definition

  const builder = new ComponentBuilder(definition)

  const div = builder.addTag('div')
  const img = div.addChildTag('img')

  const classes = []

  if (spacing === 'padding') {
    classes.push('q-pa-md')
  } else if (MARGINS[spacing]) {
    classes.push(`q-mt-${MARGINS[spacing]}`)
  }

  if (['left', 'right', 'center'].includes(horizontalAlignment)) classes.push(`text-${horizontalAlignment}`)

  if (classes.length > 0) div.addAttribute('class', classes.join(' '))

  img.addAttribute('src', url)
  img.addAttribute('alt', altText || 'Image')
  img.addAttribute('width', SIZES[size] || '40px')

  if (style === 'person') img.addAttribute('style', 'border-radius: 100%;')

  return builder.compile()
}
