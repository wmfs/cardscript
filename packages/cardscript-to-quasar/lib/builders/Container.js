module.exports = function (definition, options) {
  let div = '<div'

  if (definition.hasOwnProperty('showWhen')) div += ` v-if="${definition.showWhen}"`
  if (definition.hasOwnProperty('id')) div += ` id="${definition.id}"`

  div += '>'
  return div
}
