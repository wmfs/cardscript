module.exports = function viewscriptToExpressions (viewscript) {
  try {
    return viewscript.widgets
      .filter(widget => widget.showWhen)
      .map(widget => {
        return {widget: widget.id, expression: widget.showWhen}
      })
  } catch (error) {
    console.error('Found this error: ', error)
    console.error('Add good error messages for debugging')
  }
}
