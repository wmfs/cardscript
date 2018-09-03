module.exports = function getExpressions (viewscript) {
  try {
    return viewscript.widgets
      .filter(widget => widget.showWhen)
      .map(widget => {
        return {widget: widget.id, expression: widget.showWhen}
      })
  } catch (error) {
    console.log('Found this error: ', error)
    console.log('Add good error messages for debugging')
  }
}
