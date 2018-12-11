module.exports = function extractDefaults (cardscript) {
  const cardViewPath = []
  const defaultValues = {
    rootView: {},
    cardViews: {}
  }

  function parseElement (element) {
    switch (element.type) {
      case 'Container':
        element.items.forEach(parseElement)
        break
      case 'ColumnSet':
        element.columns.forEach(parseElement)
        break
      case 'FactSet':
        element.facts.forEach(parseElement)
        break
      case 'Collapsible':
        element.card.body.forEach(parseElement)
        break
      case 'CardView':
        if (element.editable) {
          if (cardViewPath.length === 0) {
            defaultValues.rootView[element.id] = []
          } else {
            const cardViewId = cardViewPath[cardViewPath.length - 1]
            defaultValues.cardViews[cardViewId][element.id] = []
          }
          cardViewPath.push(element.id)
          defaultValues.cardViews[element.id] = {}
          element.card.body.forEach(parseElement)
          cardViewPath.pop()
        }

        break
      case 'Column':
        element.items.forEach(parseElement)
        break
      case 'Input.Date':
      case 'Input.Number':
      case 'Input.Slider':
      case 'Input.Text':
      case 'Input.Time':
        if (element.value) {
          if (cardViewPath.length === 0) {
            defaultValues.rootView[element.id] = element.value
          } else {
            const cardViewId = cardViewPath[cardViewPath.length - 1]
            defaultValues.cardViews[cardViewId][element.id] = element.value
          }
        }
        break
      case 'Input.Toggle':
        if (cardViewPath.length === 0) {
          if (element.value === 'false') {
            defaultValues.rootView[element.id] = false
          } else if (element.value === 'true') {
            defaultValues.rootView[element.id] = true
          } else if (element.value) {
            defaultValues.rootView[element.id] = element.value
          } else {
            defaultValues.rootView[element.id] = false
          }
        } else {
          const cardViewId = cardViewPath[cardViewPath.length - 1]
          if (element.value === 'false') {
            defaultValues.cardViews[cardViewId][element.id] = false
          } else if (element.value === 'true') {
            defaultValues.cardViews[cardViewId][element.id] = true
          } else if (element.value) {
            defaultValues.cardViews[cardViewId][element.id] = element.value
          } else {
            defaultValues.cardViews[cardViewId][element.id] = false
          }
        }
        break
      case 'Input.ChoiceSet':
        if (cardViewPath.length === 0) {
          if (element.isMultiSelect) {
            defaultValues.rootView[element.id] = element.value ? element.value.split(',') : []
          } else if (element.value) {
            defaultValues.rootView[element.id] = element.value
          }
        } else {
          const cardViewId = cardViewPath[cardViewPath.length - 1]
          if (element.isMultiSelect) {
            defaultValues.cardViews[cardViewId][element.id] = element.value ? element.value.split(',') : []
          } else if (element.value) {
            defaultValues.cardViews[cardViewId][element.id] = element.value
          }
        }
        break
    }
  }

  cardscript.body.forEach(parseElement)

  return defaultValues
}
