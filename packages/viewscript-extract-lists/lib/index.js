const DEFAULT_CANDIDATE_WIDGET_TYPES = ['select', 'checkboxList', 'questionnaire']

module.exports = function extractLists (viewscript, options) {
  const candidateWidgetTypes = options && options.hasOwnProperty('candidateWidgetTypes')
    ? options.candidateWidgetTypes
    : DEFAULT_CANDIDATE_WIDGET_TYPES

  const lists = {
    $simpleTitleMaps: {}
  }

  if (viewscript && viewscript.hasOwnProperty('widgets')) {
    viewscript.widgets.forEach(widget => {
      if (candidateWidgetTypes.includes(widget.type) && widget.hasOwnProperty('attributes')) {
        let titleMap = widget.attributes.titleMap
        if (titleMap) {
          const map = {}
          const list = []
          titleMap.forEach(item => {
            list.push(
              {
                text: item.title || item.value,
                label: item.title || item.value,
                value: item.value
              }
            )
            map[item.value] = item.title || item.value
          })

          lists[widget.id] = list
          lists.$simpleTitleMaps[widget.id] = map
        }
      }
    })
  }
  return lists
}
