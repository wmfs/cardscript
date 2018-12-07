const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const {
    id,
    isMultiSelect,
    style,
    // spacing,
    separator
  } = definition

  const builder = new ComponentBuilder(definition)

  if (isMultiSelect) {
    // CHECKBOX
    const optionGroup = builder.addTag('q-option-group')
    optionGroup.bindToModel(definition)
    optionGroup.addAttribute(':options', `lists.${id}`)
    optionGroup.addAttribute('type', 'checkbox')
    if (separator) optionGroup.addAttribute('style', `border-top: 1px solid rgb(238, 238, 238); margin-top: 8px; padding-top: 8px;`)
  } else if (style === 'expanded') {
    // RADIO
    const optionGroup = builder.addTag('q-option-group')
    optionGroup.bindToModel(definition)
    optionGroup.addAttribute(':options', `lists.${id}`)
    optionGroup.addAttribute('type', 'radio')
    if (separator) optionGroup.addAttribute('style', `border-top: 1px solid rgb(238, 238, 238); margin-top: 8px; padding-top: 8px;`)
  } else {
    // SELECT
    const select = builder.addTag('q-select')
    select.bindToModel(definition)
    select.addAttribute(':options', `lists.${id}`)
    if (separator) select.addAttribute('style', `border-top: 1px solid rgb(238, 238, 238); margin-top: 8px; padding-top: 8px;`)
  }

  return builder.compile()
}
