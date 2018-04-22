
const widgetTypeDefaults = {
  checkboxList: [],
  switch: false
}

module.exports = function extractDefaults (viewscript) {
  const defaultValues = {}
  viewscript.widgets.forEach(
    function (widget) {
      let defaultValue
      if (widgetTypeDefaults.hasOwnProperty(widget.type) && widget.id) {
        defaultValue = widgetTypeDefaults[widget.type]
      }
      if (widget.hasOwnProperty('attributes')) {
        if (widget.attributes.hasOwnProperty('default')) {
          defaultValue = widget.attributes.default
        }
      }
      if (defaultValue !== undefined) {
        defaultValues[widget.id] = defaultValue
      }
    }
  )

  return defaultValues
}
