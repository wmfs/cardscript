const ComponentBuilder = require('./../utils/Component-builder')

const MARGINS = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
  extraLarge: 'xl'
}

module.exports = function (definition, options) {
  const {
    id,
    isMultiSelect,
    style,
    spacing,
    separator,
    title
  } = definition

  const builder = new ComponentBuilder(definition)

  if (isMultiSelect) {
    // CHECKBOX
    const div = builder.addTag('div')
    if (title) {
      const label = div.addChildTag('div')
      label.content(title)
    }
    const optionGroup = div.addChildTag('q-option-group')

    optionGroup.bindToModel(definition)
    optionGroup.addAttribute(':options', `lists.${id}`)
    optionGroup.addAttribute('type', 'checkbox')

    if (separator) div.addAttribute('style', `border-top: 1px solid rgb(238, 238, 238); margin-top: 8px; padding-top: 8px;`)

    const classes = []

    if (spacing === 'padding') classes.push(`q-pa-md`)
    else if (spacing && MARGINS[spacing]) classes.push(`q-mt-${MARGINS[spacing]}`)

    if (classes.length > 0) div.addAttribute('class', classes.join(' '))
  } else if (style === 'expanded') {
    // RADIO
    const div = builder.addTag('div')
    if (title) {
      const label = div.addChildTag('div')
      label.content(title)
    }
    const optionGroup = div.addChildTag('q-option-group')

    optionGroup.bindToModel(definition)
    optionGroup.addAttribute(':options', `lists.${id}`)
    optionGroup.addAttribute('type', 'radio')

    if (separator) div.addAttribute('style', `border-top: 1px solid rgb(238, 238, 238); margin-top: 8px; padding-top: 8px;`)

    const classes = []

    if (spacing === 'padding') classes.push(`q-pa-md`)
    else if (spacing && MARGINS[spacing]) classes.push(`q-mt-${MARGINS[spacing]}`)

    if (classes.length > 0) div.addAttribute('class', classes.join(' '))
  } else {
    // SELECT
    const select = builder.addTag('q-select')

    select.bindToModel(definition)
    select.addAttribute(':options', `lists.${id}`)

    if (title) select.addAttribute('float-label', title)

    if (separator) select.addAttribute('style', `border-top: 1px solid rgb(238, 238, 238); margin-top: 8px; padding-top: 8px;`)

    const classes = []

    if (spacing === 'padding') classes.push(`q-pa-md`)
    else if (spacing && MARGINS[spacing]) classes.push(`q-mt-${MARGINS[spacing]}`)

    if (classes.length > 0) select.addAttribute('class', classes.join(' '))
  }

  return builder.compile()
}
