export default function getDefaultInternals (cardscript) {
  const internals = {
    dialogControl: {},
    currentCardListData: {},
    cardListParents: {}
  }

  let cardListPath = []
  cardscript.body.forEach(parseElement)

  function parseElement (element) {
    switch (element.type) {
      case 'CardList':
        internals.dialogControl[element.id] = false
        internals.currentCardListData[element.id] = {}
        if (cardListPath.length === 0) {
          internals.cardListParents[element.id] = null
          cardListPath.push(element.id)
        } else {
          internals.cardListParents[element.id] = cardListPath[cardListPath.length - 1]
          cardListPath.push(element.id)
        }
        element.card.body.forEach(parseElement)
        cardListPath.pop()
        break
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
      case 'Column':
        element.items.forEach(parseElement)
        break
    }
  }

  return internals
}
