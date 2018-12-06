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
  } else if (style === 'expanded') {
    // RADIO
  } else {
    // SELECT
    const select = builder.addTag('q-select')
    select.addAttribute(':options', `lists.${id}`)
    select.bindToModel(definition)
  }

  return builder.compile()
}
