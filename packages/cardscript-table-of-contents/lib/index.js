// todo: add depth, nested containers

module.exports = function extractTableOfContents (cardscript) {
  const toc = []

  function parseElement (element) {
    switch (element.type) {
      case 'Container':
        if (element.title) {
          toc.push({
            elementId: element.id,
            tocTitle: element.title,
            tocIcon: element.tocIcon || 'bookmark'
          })
        }
        break
    }
  }

  cardscript.body.forEach(parseElement)

  return toc
}
