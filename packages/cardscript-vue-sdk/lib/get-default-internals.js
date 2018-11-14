export default function getDefaultInternals (cardscript) {
  const internals = {
    dialogControl: {},
    currentSubViewData: {},
    subViewParents: {}
  }

  if (cardscript.hasOwnProperty('widgets')) {
    let subViewPath = []
    cardscript.widgets.forEach(
      function (widget) {
        switch (widget.type) {
          case 'subView':
            internals.dialogControl[widget.id] = false
            internals.currentSubViewData[widget.id] = {}
            if (subViewPath.length === 0) {
              internals.subViewParents[widget.id] = null
              subViewPath.push(widget.id)
            } else {
              internals.subViewParents[widget.id] = subViewPath[subViewPath.length - 1]
              subViewPath.push(widget.id)
            }
            break
          case 'endSubView':
            subViewPath.pop()
        }
      }
    )
  }

  return internals
}
