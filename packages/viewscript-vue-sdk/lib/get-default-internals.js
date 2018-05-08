module.exports = function getDefaultInternals (viewscript) {
  const internals = {
    dialogControl: {},
    currentSubViewData: {}
  }

  if (viewscript.hasOwnProperty('widgets')) {
    viewscript.widgets.forEach(
      function (widget) {
        if (widget.type === 'subView') {
          internals.dialogControl[widget.id] = false
          internals.currentSubViewData[widget.id] = {}
        }
      }
    )
  }

  return internals
}
