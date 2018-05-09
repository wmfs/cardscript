module.exports = function setConverter (widgetDefinition, options) {
  // tocTitle
  let div = '<div'
  if (widgetDefinition.hasOwnProperty('showWhen')) {
    div += ` v-if="${widgetDefinition.showWhen}"`
  }
  if (widgetDefinition.hasOwnProperty('id')) {
    div += ` id="${widgetDefinition.id}"`
  }
  div += '>'
  return div
}
