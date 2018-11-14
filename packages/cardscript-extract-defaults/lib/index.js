const widgetTypeDefaults = {
  checkboxList: [],
  switch: false,
  richtext: ''
}

module.exports = function extractDefaults (cardscript) {
  const subViewPath = []
  const defaultValues = {
    rootView: {},
    subViews: {}
  }

  function addDefault (key, defaultValue) {
    if (defaultValue !== undefined) {
      if (subViewPath.length === 0) {
        defaultValues.rootView[key] = defaultValue
      } else {
        const subViewId = subViewPath[subViewPath.length - 1]
        defaultValues.subViews[subViewId][key] = defaultValue
      }
    }
  }

  cardscript.widgets.forEach(widget => {
    let defaultValue
    switch (widget.type) {
      case 'subView':
        addDefault(widget.id, [])
        defaultValues.subViews[widget.id] = {}
        subViewPath.push(widget.id)
        break

      case 'endSubView':
        subViewPath.pop()
        break

      default:
        defaultValue = widgetTypeDefaults[widget.type]
        if (widget.hasOwnProperty('attributes')) {
          if (widget.attributes.hasOwnProperty('default')) {
            defaultValue = widget.attributes.default
          }
        }

        addDefault(widget.id, defaultValue)
        break
    }
  })

  return defaultValues
}
