module.exports = function extractTableOfContents (cardscript) {
  const toc = []
  let depth = 0
  cardscript.widgets.forEach(
    function (widget) {
      if (widget.type === 'set') {
        depth++
        if (widget.hasOwnProperty('attributes') && depth === 1) {
          const tocTitle = widget.attributes.tocTitle
          if (tocTitle) {
            toc.push(
              {
                widgetId: widget.id,
                tocTitle: tocTitle,
                tocIcon: widget.attributes.tocIcon || 'bookmark'
              }
            )
          }
        }
      } else if (widget.type === 'endSet') {
        depth--
      }
    }
  )
  return toc
}
