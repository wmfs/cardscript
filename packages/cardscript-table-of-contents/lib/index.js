module.exports = function extractTableOfContents (cardscript) {
  const toc = []
  cardscript.body.forEach(element => {
    if (element.type === 'Container') {
      if (element.title) {
        const tocTitle = element.title
        toc.push({
          elementId: element.id,
          tocTitle,
          tocIcon: element.tocIcon || 'bookmark'
        })
      }
    }
    // if (widget.type === 'set') {
    //   depth++
    //   if (widget.hasOwnProperty('attributes') && depth === 1) {
    //     const tocTitle = widget.attributes.tocTitle
    //     if (tocTitle) {
    //       toc.push(
    //         {
    //           widgetId: widget.id,
    //           tocTitle: tocTitle,
    //           tocIcon: widget.attributes.tocIcon || 'bookmark'
    //         }
    //       )
    //     }
    //   }
    // } else if (widget.type === 'endSet') {
    //   depth--
    // }
  })
  return toc
}
