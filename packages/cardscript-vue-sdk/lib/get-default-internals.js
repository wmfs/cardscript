export default function getDefaultInternals (cardscript) {
  const internals = {
    dialogControl: {},
    currentCardViewData: {},
    cardViewParents: {}
  }

  let cardViewPath = []
  cardscript.body.forEach(parseElement)

  function parseElement (element) {
    switch (element.type) {
      case 'CardView':
        internals.dialogControl[element.id] = false
        internals.currentCardViewData[element.id] = {}
        if (cardViewPath.length === 0) {
          internals.cardViewParents[element.id] = null
          cardViewPath.push(element.id)
        } else {
          internals.cardViewParents[element.id] = cardViewPath[cardViewPath.length - 1]
          cardViewPath.push(element.id)
        }
        element.card.body.forEach(parseElement)
        cardViewPath.pop()
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
