module.exports = function extractDefaults (cardscript) {
  const defaultValues = {
    rootView: {}
  }

  function parseElement (element) {
    switch (element.type) {
      case 'Container':
        // Container replaces set
        element.items.forEach(parseElement)
        break
      case 'ColumnSet':
        element.columns.forEach(parseElement)
        break
      case 'FactSet':
        element.facts.forEach(parseElement)
        break
      case 'CardList':
        // CardList replaces subView
        console.log('CardList')
        break
      case 'Column':
        element.items.forEach(parseElement)
        break
      case 'Input.Text':
        if (element.default) {
          defaultValues.rootView[element.id] = element.default
        }
        break
      case 'Input.Toggle':
        if (element.value === 'false') {
          defaultValues.rootView[element.id] = false
        } else if (element.value === 'true') {
          defaultValues.rootView[element.id] = true
        } else if (element.value) {
          defaultValues.rootView[element.id] = element.value
        } else {
          defaultValues.rootView[element.id] = false
        }
        break
      case 'Input.ChoiceSet':
        if (element.isMultiSelect) {
          defaultValues.rootView[element.id] = element.value ? element.value.split(',') : []
        } else if (element.value) {
          defaultValues.rootView[element.id] = element.value
        }
        break
    }
  }

  cardscript.body.forEach(parseElement)

  return defaultValues

  // const subViewPath = []
  // const defaultValues = {
  //   rootView: {},
  //   subViews: {}
  // }
  //
  // function addDefault (key, defaultValue) {
  //   if (defaultValue !== undefined) {
  //     if (subViewPath.length === 0) {
  //       defaultValues.rootView[key] = defaultValue
  //     } else {
  //       const subViewId = subViewPath[subViewPath.length - 1]
  //       defaultValues.subViews[subViewId][key] = defaultValue
  //     }
  //   }
  // }
  //
  // cardscript.widgets.forEach(widget => {
  //   let defaultValue
  //   switch (widget.type) {
  //     case 'subView':
  //       addDefault(widget.id, [])
  //       defaultValues.subViews[widget.id] = {}
  //       subViewPath.push(widget.id)
  //       break
  //
  //     case 'endSubView':
  //       subViewPath.pop()
  //       break
  //
  //     default:
  //       defaultValue = widgetTypeDefaults[widget.type]
  //       if (widget.hasOwnProperty('attributes')) {
  //         if (widget.attributes.hasOwnProperty('default')) {
  //           defaultValue = widget.attributes.default
  //         }
  //       }
  //
  //       addDefault(widget.id, defaultValue)
  //       break
  //   }
  // })
  //
  // return defaultValues
}
