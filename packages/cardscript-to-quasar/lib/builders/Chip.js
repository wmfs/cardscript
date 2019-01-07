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
  const { icon, color, text } = definition

  const builder = new ComponentBuilder(definition)

  const chip = builder.addTag('q-chip')
  chip.content(text)

  if (icon) chip.addAttribute('icon', icon)
  if (color && COLORS[color]) chip.addAttribute('color', COLORS[color])

  return builder.compile()
}
