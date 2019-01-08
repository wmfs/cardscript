module.exports = function extractDefaults (cardscript) {
  const cardListPath = []
  const defaultValues = {
    rootView: {},
    cardLists: {}
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
      case 'CardList':
        if (element.editable) {
          if (cardListPath.length === 0) {
            defaultValues.rootView[element.id] = []
          } else {
            const cardListId = cardListPath[cardListPath.length - 1]
            defaultValues.cardLists[cardListId][element.id] = []
          }
          cardListPath.push(element.id)
          defaultValues.cardLists[element.id] = {}
          element.card.body.forEach(parseElement)
          cardListPath.pop()
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
        if (element.value === 0 || element.value) {
          if (cardListPath.length === 0) {
            defaultValues.rootView[element.id] = element.value
          } else {
            const cardListId = cardListPath[cardListPath.length - 1]
            defaultValues.cardLists[cardListId][element.id] = element.value
          }
        } else if (element.type === 'Input.Text') {
          if (cardListPath.length === 0) {
            defaultValues.rootView[element.id] = ''
          } else {
            const cardListId = cardListPath[cardListPath.length - 1]
            defaultValues.cardLists[cardListId][element.id] = ''
          }
        }
        break
      case 'Input.Toggle':
        if (cardListPath.length === 0) {
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
          const cardListId = cardListPath[cardListPath.length - 1]
          if (element.value === 'false') {
            defaultValues.cardLists[cardListId][element.id] = false
          } else if (element.value === 'true') {
            defaultValues.cardLists[cardListId][element.id] = true
          } else if (element.value) {
            defaultValues.cardLists[cardListId][element.id] = element.value
          } else {
            defaultValues.cardLists[cardListId][element.id] = false
          }
        }
        break
      case 'Input.ChoiceSet':
        if (cardListPath.length === 0) {
          if (element.isMultiSelect) {
            defaultValues.rootView[element.id] = element.value ? element.value.split(',') : []
          } else if (element.value) {
            defaultValues.rootView[element.id] = element.value
          }
        } else {
          const cardListId = cardListPath[cardListPath.length - 1]
          if (element.isMultiSelect) {
            defaultValues.cardLists[cardListId][element.id] = element.value ? element.value.split(',') : []
          } else if (element.value) {
            defaultValues.cardLists[cardListId][element.id] = element.value
          }
        }
        break
      case 'Input.Address':
        if (cardListPath.length === 0) {
          defaultValues.rootView[element.id + 'SearchResults'] = []
        } else {
          const cardListId = cardListPath[cardListPath.length - 1]
          defaultValues.cardLists[cardListId][element.id + 'SearchResults'] = []
        }
        break
      case 'Input.Signature':
        if (cardListPath.length === 0) {
          defaultValues.rootView[element.id + 'OpenModal'] = false
        } else {
          const cardListId = cardListPath[cardListPath.length - 1]
          defaultValues.cardLists[cardListId][element.id + 'OpenModal'] = false
        }
        break
    }
  }

  cardscript.body.forEach(parseElement)

  return defaultValues
}
