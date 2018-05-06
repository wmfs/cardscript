const DEFAULT_CANDIDATE_WIDGET_TYPES = ['select']

module.exports = function extractLists (viewscript, options) {
  let candidateWidgetTypes
  if (options && options.hasOwnProperty('candidateWidgetTypes')) {
    candidateWidgetTypes = options.candidateWidgetTypes
  } else {
    candidateWidgetTypes = DEFAULT_CANDIDATE_WIDGET_TYPES
  }

  const lists = {}

  if (viewscript && viewscript.hasOwnProperty('widgets')) {
    viewscript.widgets.forEach(
      function (widget) {
        if (candidateWidgetTypes.includes(widget.type) && widget.hasOwnProperty('attributes')) {
          let titleMap = widget.attributes.titleMap
          if (titleMap) {
            const list = []
            titleMap.forEach(
              function (item) {
                list.push(
                  {
                    text: item.title || item.value,
                    value: item.value
                  }
                )
              }
            )

            lists[widget.id] = list
          }
        }
      }
    )
  }
  return lists
}
