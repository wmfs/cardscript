const ComponentBuilder = require('./../utils/Component-builder')

module.exports = function (definition, options) {
  const {
    // choices,
    id,
    isMultiSelect,
    style
    // value,
    // spacing,
    // separator
  } = definition

  const builder = new ComponentBuilder(definition)

  if (isMultiSelect) {
    // CHECKBOX
    const optionGroup = builder.addTag('q-option-group')
    optionGroup.bindToModel(definition)
    optionGroup.addAttribute(':options', `lists.${id}`)
    optionGroup.addAttribute('type', 'checkbox')
  } else if (style === 'expanded') {
    // RADIO
    const optionGroup = builder.addTag('q-option-group')
    optionGroup.bindToModel(definition)
    optionGroup.addAttribute(':options', `lists.${id}`)
    optionGroup.addAttribute('type', 'radio')
  } else {
    // SELECT
    const select = builder.addTag('q-select')
    select.bindToModel(definition)
    select.addAttribute(':options', `lists.${id}`)
  }

  return builder.compile()
}
