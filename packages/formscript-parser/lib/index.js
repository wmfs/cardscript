
const widgetTypeDefaults = {
  checkboxList: [],
  switch: false
}

module.exports.parse = function parseFormscript (formscript) {
  const parsed = {
    defaultValues: {},
    toc: []
  }
  formscript.widgets.forEach(
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
        parsed.defaultValues[widget.id] = defaultValue
      }
    }
  )

  return parsed
}
