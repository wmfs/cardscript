module.exports = function (cardscript) {
  const lists = {
    $simpleTitleMaps: {}
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
      case 'Input.ChoiceSet':
        if (element.choices) {
          const map = {}
          lists[element.id] = element.choices.map(({ title, value }) => {
            map[value] = title || value
            return {
              text: title || value,
              label: title || value,
              value
            }
          })
          lists.$simpleTitleMaps[element.id] = map
        }
        break
    }
  }

  if (cardscript && cardscript.body) {
    cardscript.body.forEach(parseElement)
  }

  return lists

  // const candidateWidgetTypes = options && options.hasOwnProperty('candidateWidgetTypes')
  //   ? options.candidateWidgetTypes
  //   : DEFAULT_CANDIDATE_WIDGET_TYPES
  //
  // const lists = {
  //   $simpleTitleMaps: {}
  // }
  //
  // if (cardscript && cardscript.hasOwnProperty('widgets')) {
  //   cardscript.widgets.forEach(widget => {
  //     if (candidateWidgetTypes.includes(widget.type) && widget.hasOwnProperty('attributes')) {
  //       let titleMap = widget.attributes.titleMap
  //       if (titleMap) {
  //         const map = {}
  //         const list = []
  //         titleMap.forEach(item => {
  //           list.push(
  //             {
  //               text: item.title || item.value,
  //               label: item.title || item.value,
  //               value: item.value
  //             }
  //           )
  //           map[item.value] = item.title || item.value
  //         })
  //
  //         lists[widget.id] = list
  //         lists.$simpleTitleMaps[widget.id] = map
  //       }
  //     }
  //   })
  // }
  // return lists
}
