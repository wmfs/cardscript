module.exports = function getAttribute (widgetDefinition) {
  let attributes
  if (widgetDefinition && widgetDefinition.hasOwnProperty('attributes')) {
    attributes = widgetDefinition.attributes
  } else {
    attributes = {}
  }

  return function (key) {
    return attributes[key]
  }
}
